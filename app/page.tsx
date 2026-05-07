'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Listing {
  id: string
  title: string
  description: string
  category: string
  city: string
  country: string
  estimated_value: number
  image_url: string
}

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const search =
  searchParams.get('search') || ''
 useEffect(() => {
  fetchListings()
}, [search])

  async function fetchListings() {

  let query = supabase
    .from('listings')
    .select('*')
    .order('created_at', {
      ascending: false,
    })

  if (search) {
    query = query.ilike(
      'title',
      `%${search}%`
    )
  }

  const { data, error } = await query

  if (error) {
    console.log(error)
    return
  }

  setListings(data || [])

  setLoading(false)
}

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-5xl font-black">
              TROKA
            </h1>

            <p className="text-slate-500 mt-2">
              Trade anything with anyone.
            </p>
          </div>

          <a
            href="/create-listing"
            className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-4 rounded-2xl font-bold"
          >
            Create Listing
          </a>

        </div>

        {loading ? (
          <p>Loading listings...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {listings.map((listing) => (

              <div
                key={listing.id}
                className="bg-white rounded-[30px] overflow-hidden shadow-lg border"
              >

                <img
                  src={
                    listing.image_url ||
                    'https://placehold.co/600x400?text=No+Image'
                  }
                  alt={listing.title}
                  className="w-full h-[250px] object-cover"
                />

                <div className="p-6">

                  <div className="flex items-center justify-between mb-3">

                    <span className="bg-slate-100 px-4 py-2 rounded-full text-sm font-semibold">
                      {listing.category}
                    </span>

                    <span className="font-black text-green-600">
                      ${listing.estimated_value}
                    </span>

                  </div>

                  <h2 className="text-2xl font-black mb-2">
                    {listing.title}
                  </h2>

                  <p className="text-slate-600 line-clamp-3 mb-5">
                    {listing.description}
                  </p>

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-slate-500">
                      {listing.city}, {listing.country}
                    </span>

                    <a
  href={`/listing/${listing.id}`}
  className="bg-black text-white px-5 py-3 rounded-xl font-bold"
>
  View
</a>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </main>
  )
}