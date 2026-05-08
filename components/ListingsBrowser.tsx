'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Listing {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  estimated_value: number
  desired_trade: string
  country: string
  city: string
  status: string
}

export default function ListingsBrowser() {

  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''

  const [listings, setListings] =
    useState<Listing[]>([])

  const [loading, setLoading] =
    useState(true)

  const availableListings = listings.filter(
    (listing) => listing.status === 'available'
  )

  const countries = Array.from(
    new Set(
      listings
        .map((listing) => listing.country)
        .filter(Boolean)
    )
  )

  const categoryCounts = listings.reduce<Record<string, number>>(
    (counts, listing) => {
      counts[listing.category] = (counts[listing.category] || 0) + 1
      return counts
    },
    {}
  )

  const visibleCategories = Object.entries(categoryCounts)
    .sort((first, second) => second[1] - first[1])
    .slice(0, 6)

  const totalValue = listings.reduce(
    (sum, listing) => sum + Number(listing.estimated_value || 0),
    0
  )

  const formattedTotalValue = new Intl.NumberFormat(
    'en-US',
    {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'USD',
    }
  ).format(totalValue)

  useEffect(() => {
    async function fetchListings() {

      setLoading(true)

      let query = supabase
        .from('listings')
        .select('*')
        .order('created_at', {
          ascending: false,
        })

      if (search) {

        query = query.ilike(
          'title',
          '%' + search + '%'
        )
      }

      if (category) {

        query = query.eq(
          'category',
          category
        )
      }

      const {
        data,
        error,
      } = await query

      if (error) {
        console.log(error)
        setLoading(false)
        return
      }

      setListings(data || [])

      setLoading(false)
    }

    fetchListings()
  }, [search, category])

  if (loading) {

    return (

      <main className="min-h-screen bg-slate-100 px-4 py-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-black">
            Loading listings...
          </h1>

        </div>

      </main>
    )
  }

  return (

    <main className="min-h-screen bg-slate-100 px-3 md:px-6 py-6 md:py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>

            <h1 className="text-3xl md:text-5xl font-black mb-2">
              Marketplace
            </h1>

            <p className="text-slate-500 text-sm md:text-lg">
              Discover products and trade opportunities.
            </p>

          </div>

          {(search || category) && (

            <div className="flex flex-wrap items-center gap-3">

              {search && (

                <div className="bg-white border rounded-full px-4 py-2 text-sm font-semibold">
                  Search: {search}
                </div>

              )}

              {category && (

                <div className="bg-green-500 text-white rounded-full px-4 py-2 text-sm font-semibold">
                  {category}
                </div>

              )}

              <Link
                href="/"
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold"
              >
                Clear
              </Link>

            </div>

          )}

        </div>

        {listings.length === 0 ? (

          <div className="bg-white rounded-[30px] border shadow-sm p-10 text-center">

            <h2 className="text-2xl font-black mb-4">
              No listings found
            </h2>

            <p className="text-slate-500 mb-8">
              Try another category or search term.
            </p>

            <Link
              href="/"
              className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-4 rounded-2xl font-bold"
            >
              View All Listings
            </Link>

          </div>

        ) : (

          <>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">

            <div className="bg-white border rounded-2xl px-4 py-3">
              <p className="text-[11px] uppercase font-black text-slate-400">
                Items
              </p>
              <p className="text-2xl font-black">
                {listings.length}
              </p>
            </div>

            <div className="bg-white border rounded-2xl px-4 py-3">
              <p className="text-[11px] uppercase font-black text-slate-400">
                Available
              </p>
              <p className="text-2xl font-black text-green-600">
                {availableListings.length}
              </p>
            </div>

            <div className="bg-white border rounded-2xl px-4 py-3">
              <p className="text-[11px] uppercase font-black text-slate-400">
                Countries
              </p>
              <p className="text-2xl font-black">
                {countries.length}
              </p>
            </div>

            <div className="bg-white border rounded-2xl px-4 py-3">
              <p className="text-[11px] uppercase font-black text-slate-400">
                Total Value
              </p>
              <p className="text-xl md:text-2xl font-black">
                {formattedTotalValue}
              </p>
            </div>

          </div>

          {visibleCategories.length > 0 && (

            <div className="flex gap-2 overflow-x-auto pb-3 mb-2">

              {visibleCategories.map(([categoryName, count]) => (

                <Link
                  href={'/?category=' + encodeURIComponent(categoryName)}
                  key={categoryName}
                  className="bg-white border hover:border-green-500 transition rounded-full px-4 py-2 text-xs font-black whitespace-nowrap"
                >
                  {categoryName}
                  <span className="ml-2 text-slate-400">
                    {count}
                  </span>
                </Link>

              ))}

            </div>

          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">

            {listings.map((listing) => (

              <Link
                href={'/listing/' + listing.id}
                key={listing.id}
                className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition duration-300"
              >

                <div className="aspect-square overflow-hidden bg-slate-200">

                  <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="p-3 md:p-4">

                  <div className="flex items-center justify-between gap-2 mb-2">

                    <span className="bg-slate-100 px-2 py-1 rounded-full text-[10px] font-bold text-slate-700 truncate">
                      {listing.category}
                    </span>

                    <span
                      className={
                        'px-2 py-1 rounded-full text-[10px] font-bold ' +
                        (
                          listing.status === 'traded'
                            ? 'bg-green-100 text-green-700'
                            : listing.status === 'reserved'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        )
                      }
                    >
                      {listing.status}
                    </span>

                  </div>

                  <h2 className="text-sm md:text-lg font-black mb-2 line-clamp-1">
                    {listing.title}
                  </h2>

                  <p className="text-slate-500 mb-3 text-xs md:text-sm line-clamp-2 hidden md:block">
                    {listing.description}
                  </p>

                  {listing.desired_trade && (

                    <div className="bg-slate-50 rounded-xl px-3 py-2 mb-3">
                      <p className="text-[10px] font-black uppercase text-slate-400">
                        Wants
                      </p>
                      <p className="text-xs md:text-sm font-bold text-slate-700 line-clamp-1">
                        {listing.desired_trade}
                      </p>
                    </div>

                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                    <div>

                      <p className="text-[10px] md:text-xs text-slate-400">
                        Value
                      </p>

                      <p className="text-sm md:text-lg font-black text-green-600">
                        ${listing.estimated_value}
                      </p>

                    </div>

                    <div className="text-left sm:text-right">

                      <p className="text-[10px] md:text-xs text-slate-400">
                        Location
                      </p>

                      <p className="font-semibold text-[11px] md:text-sm text-slate-700 line-clamp-1">
                        {listing.city}
                        {listing.country ? ', ' + listing.country : ''}
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

    </main>
  )
}
