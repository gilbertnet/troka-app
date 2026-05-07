# app/page.tsx

```tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Listing {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  estimated_value: number
  country: string
  city: string
  status: string
}

export default function HomePage() {

  const [listings, setListings] =
    useState<Listing[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  const [category, setCategory] =
    useState('')

  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    )

    const searchParam =
      params.get('search') || ''

    const categoryParam =
      params.get('category') || ''

    setSearch(searchParam)
    setCategory(categoryParam)

  }, [])

  useEffect(() => {
    fetchListings()
  }, [search, category])

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

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-black mb-10">
            Loading listings...
          </h1>

        </div>

      </main>
    )
  }

  return (

    <main className="min-h-screen bg-slate-100 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>

            <h1 className="text-5xl font-black mb-2">
              Marketplace
            </h1>

            <p className="text-slate-500 text-lg">
              Discover products, services and trade opportunities.
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
                Clear Filters
              </Link>

            </div>

          )}

        </div>

        {/* EMPTY STATE */}

        {listings.length === 0 && (

          <div className="bg-white rounded-[30px] border shadow-sm p-16 text-center">

            <h2 className="text-3xl font-black mb-4">
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

        )}

        {/* GRID */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {listings.map((listing) => (

            <Link
              href={'/listing/' + listing.id}
              key={listing.id}
              className="bg-white rounded-[30px] overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >

              <div className="aspect-square overflow-hidden bg-slate-200">

                <img
                  src={listing.image_url}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="p-6">

                <div className="flex items-center justify-between gap-3 mb-4">

                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                    {listing.category}
                  </span>

                  <span
                    className={
  'px-3 py-1 rounded-full text-xs font-bold ' +
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

                <h2 className="text-2xl font-black mb-3 line-clamp-1">
                  {listing.title}
                </h2>

                <p className="text-slate-500 mb-5 line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-400">
                      Estimated Value
                    </p>

                    <p className="text-2xl font-black text-green-600">
                      ${listing.estimated_value}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-slate-400">
                      Location
                    </p>

                    <p className="font-semibold text-slate-700">
                      {listing.city}
                    </p>

                    <p className="text-sm text-slate-500">
                      {listing.country}
                    </p>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>
  )
}
```

Reemplaza TODO el contenido actual de `app/page.tsx` por este archivo completo.
