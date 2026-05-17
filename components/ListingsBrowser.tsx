'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Listing {
  id: string
  user_id: string
  title: string
  description: string
  category: string
  image_url: string
  estimated_value: number
  desired_trade: string
  country: string
  city: string
  status: string
  created_at?: string
}

interface SellerStat {
  userId: string
  tradedThisMonth: number
  totalListings: number
}

interface SellerProfile {
  id: string
  display_name?: string | null
}

function getPeriodStart(now: Date, period: 'day' | 'week' | 'month') {
  const start = new Date(now)

  if (period === 'day') {
    start.setHours(0, 0, 0, 0)
    return start
  }

  if (period === 'week') {
    const day = start.getDay()
    const diff = day === 0 ? 6 : day - 1
    start.setDate(start.getDate() - diff)
    start.setHours(0, 0, 0, 0)
    return start
  }

  start.setDate(1)
  start.setHours(0, 0, 0, 0)
  return start
}

export default function ListingsBrowser() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''

  const [listings, setListings] = useState<Listing[]>([])
  const [profilesById, setProfilesById] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const availableListings = listings.filter((listing) => listing.status === 'available')
  const tradedListings = listings.filter((listing) => listing.status === 'traded')

  const countries = Array.from(new Set(listings.map((listing) => listing.country).filter(Boolean)))

  const categoryCounts = listings.reduce<Record<string, number>>((counts, listing) => {
    counts[listing.category] = (counts[listing.category] || 0) + 1
    return counts
  }, {})

  const visibleCategories = Object.entries(categoryCounts)
    .sort((first, second) => second[1] - first[1])
    .slice(0, 6)

  const totalValue = listings.reduce((sum, listing) => sum + Number(listing.estimated_value || 0), 0)

  const formattedTotalValue = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'USD',
  }).format(totalValue)

  const topTradedArticle = useMemo(() => {
    if (tradedListings.length === 0) {
      return null
    }

    const countByTitle = tradedListings.reduce<Record<string, number>>((map, listing) => {
      map[listing.title] = (map[listing.title] || 0) + 1
      return map
    }, {})

    const [title, count] = Object.entries(countByTitle).sort((a, b) => b[1] - a[1])[0]
    return { title, count }
  }, [tradedListings])

  const topSellers = useMemo(() => {
    const now = new Date()
    const monthStart = getPeriodStart(now, 'month')

    const stats = listings.reduce<Record<string, SellerStat>>((map, listing) => {
      const sellerId = listing.user_id || 'unknown'

      if (!map[sellerId]) {
        map[sellerId] = {
          userId: sellerId,
          tradedThisMonth: 0,
          totalListings: 0,
        }
      }

      map[sellerId].totalListings += 1

      if (listing.status === 'traded' && listing.created_at) {
        const createdAt = new Date(listing.created_at)
        if (createdAt >= monthStart) {
          map[sellerId].tradedThisMonth += 1
        }
      }

      return map
    }, {})

    return Object.values(stats)
      .sort((a, b) => {
        if (b.tradedThisMonth !== a.tradedThisMonth) {
          return b.tradedThisMonth - a.tradedThisMonth
        }
        return b.totalListings - a.totalListings
      })
      .slice(0, 3)
  }, [listings])

  const tradedPeriods = useMemo(() => {
    const now = new Date()
    const dayStart = getPeriodStart(now, 'day')
    const weekStart = getPeriodStart(now, 'week')
    const monthStart = getPeriodStart(now, 'month')

    const day = tradedListings.filter((listing) => listing.created_at && new Date(listing.created_at) >= dayStart).length
    const week = tradedListings.filter((listing) => listing.created_at && new Date(listing.created_at) >= weekStart).length
    const month = tradedListings.filter((listing) => listing.created_at && new Date(listing.created_at) >= monthStart).length

    return { day, week, month }
  }, [tradedListings])

  async function fetchListings(isManualRefresh = false) {
    if (isManualRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    let query = supabase.from('listings').select('*').order('created_at', {
      ascending: false,
    })

    if (search) {
      query = query.ilike('title', '%' + search + '%')
    }

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      console.log(error)
      if (isManualRefresh) {
        setRefreshing(false)
      } else {
        setLoading(false)
      }
      return
    }

    const nextListings = data || []
    setListings(nextListings)

    const sellerIds = Array.from(
      new Set(
        nextListings
          .map((listing) => listing.user_id)
          .filter(Boolean)
      )
    )

    if (sellerIds.length > 0) {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, display_name')
        .in('id', sellerIds)

      if (!profilesError && profiles) {
        const map = profiles.reduce<Record<string, string>>((acc, profile) => {
          const typedProfile = profile as SellerProfile
          if (typedProfile.id) {
            acc[typedProfile.id] = typedProfile.display_name || typedProfile.id.slice(0, 8)
          }
          return acc
        }, {})
        setProfilesById(map)
      } else {
        setProfilesById({})
      }
    } else {
      setProfilesById({})
    }
    if (isManualRefresh) {
      setRefreshing(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function runFetch() {
      await fetchListings(false)
    }

    runFetch()
  }, [search, category])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-black">Loading listings...</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 px-3 md:px-6 py-3 md:py-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px] items-start gap-3 mb-4 md:mb-6">
          <div className="lg:flex-1">
            <h1 className="text-3xl md:text-5xl font-black leading-tight">Marketplace</h1>
            <p className="text-slate-500 text-sm md:text-base">Discover products and trade opportunities.</p>
          </div>

          <div className="w-full min-h-[160px] bg-gradient-to-r from-emerald-700 to-teal-600 text-white border-2 border-emerald-900 rounded-2xl px-4 py-3 shadow-md">
            <p className="text-[11px] font-black uppercase text-emerald-100 mb-2">Nuevo Panel De Metricas</p>

            <div className="space-y-2 text-sm">
              <p className="text-[10px] uppercase font-black tracking-wide bg-black/20 inline-block px-2 py-1 rounded-md">
                Visible junto al titulo Marketplace
              </p>
              <p className="font-semibold text-slate-100 truncate">
                Top traded item:{' '}
                <span className="font-black text-white">
                  {topTradedArticle ? `${topTradedArticle.title} (${topTradedArticle.count})` : 'No traded items yet'}
                </span>
              </p>

              <p className="font-semibold text-slate-100">
                Traded volume: <span className="font-black text-white">Today {tradedPeriods.day}</span> |{' '}
                <span className="font-black text-white">Week {tradedPeriods.week}</span> |{' '}
                <span className="font-black text-white">Month {tradedPeriods.month}</span>
              </p>

              <div className="flex flex-wrap gap-2">
                {topSellers.map((seller, index) => (
                  <span key={seller.userId} className="bg-white/15 border border-white/20 rounded-full px-3 py-1 text-[11px] font-black text-white">
                    #{index + 1} {profilesById[seller.userId] || seller.userId.slice(0, 8)} · M:{seller.tradedThisMonth} · T:{seller.totalListings}
                  </span>
                ))}
                {topSellers.length === 0 && (
                  <span className="text-xs font-semibold text-slate-300">No seller ranking available yet.</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  void fetchListings(true)
                }}
                disabled={refreshing}
                className="mt-1 inline-flex items-center rounded-full bg-black/20 hover:bg-black/30 disabled:opacity-60 px-3 py-1 text-[11px] font-black text-white border border-white/40 transition"
              >
                {refreshing ? 'Refreshing...' : 'Refresh metrics'}
              </button>
            </div>
          </div>
        </div>

        {(search || category) && (
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {search && <div className="bg-white border rounded-full px-3 py-1.5 text-xs font-semibold">Search: {search}</div>}
            {category && <div className="bg-green-500 text-white rounded-full px-3 py-1.5 text-xs font-semibold">{category}</div>}
            <Link href="/" className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-bold">
              Clear
            </Link>
          </div>
        )}

        {listings.length === 0 ? (
          <div className="bg-white rounded-[30px] border shadow-sm p-10 text-center">
            <h2 className="text-2xl font-black mb-4">No listings found</h2>
            <p className="text-slate-500 mb-8">Try another category or search term.</p>
            <Link href="/" className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-4 rounded-2xl font-bold">
              View All Listings
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="bg-white border-2 border-slate-300 rounded-full px-3 py-1.5 text-xs font-black">ITEMS {listings.length}</div>
              <div className="bg-white border-2 border-green-300 rounded-full px-3 py-1.5 text-xs font-black text-green-700">
                AVAILABLE {availableListings.length}
              </div>
              <div className="bg-white border-2 border-slate-300 rounded-full px-3 py-1.5 text-xs font-black">COUNTRIES {countries.length}</div>
              <div className="bg-white border-2 border-slate-300 rounded-full px-3 py-1.5 text-xs font-black">VALUE {formattedTotalValue}</div>
            </div>

            {visibleCategories.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
                {visibleCategories.map(([categoryName, count]) => (
                  <Link
                    href={'/?category=' + encodeURIComponent(categoryName)}
                    key={categoryName}
                    className="bg-white border hover:border-green-500 transition rounded-full px-3 py-1.5 text-[11px] md:text-xs font-black whitespace-nowrap"
                  >
                    {categoryName}
                    <span className="ml-2 text-slate-400">{count}</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {listings.map((listing) => (
                <Link
                  href={'/listing/' + listing.id}
                  key={listing.id}
                  className="bg-white rounded-xl md:rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition duration-300"
                >
                  <div className="aspect-square overflow-hidden bg-slate-200">
                    <img src={listing.image_url} alt={listing.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-2.5 md:p-4">
                    <div className="flex items-center justify-between gap-1.5 md:gap-2 mb-2">
                      <span className="bg-slate-100 px-2 py-1 rounded-full text-[9px] md:text-[10px] font-bold text-slate-700 truncate">
                        {listing.category}
                      </span>

                      <span
                        className={
                          'px-2 py-1 rounded-full text-[9px] md:text-[10px] font-bold ' +
                          (listing.status === 'traded'
                            ? 'bg-green-100 text-green-700'
                            : listing.status === 'reserved'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700')
                        }
                      >
                        {listing.status}
                      </span>
                    </div>

                    <h2 className="text-[13px] md:text-lg font-black mb-1.5 md:mb-2 line-clamp-1">{listing.title}</h2>

                    <p className="text-slate-500 mb-3 text-xs md:text-sm line-clamp-2 hidden md:block">{listing.description}</p>

                    {listing.desired_trade && (
                      <div className="hidden md:block bg-slate-50 rounded-xl px-3 py-2 mb-3">
                        <p className="text-[10px] font-black uppercase text-slate-400">Wants</p>
                        <p className="text-xs md:text-sm font-bold text-slate-700 line-clamp-1">{listing.desired_trade}</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 md:gap-2">
                      <div>
                        <p className="hidden md:block text-xs text-slate-400">Value</p>
                        <p className="text-sm md:text-lg font-black text-green-600">${listing.estimated_value}</p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="hidden md:block text-xs text-slate-400">Location</p>
                        <p className="font-semibold text-[11px] md:text-sm text-slate-700 line-clamp-1">
                          {listing.city}
                          <span className="hidden md:inline">{listing.country ? ', ' + listing.country : ''}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <Link
        href="/create-listing"
        aria-label="Create listing"
        className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-900/20 md:hidden"
      >
        <Plus className="h-7 w-7" />
      </Link>
    </main>
  )
}
