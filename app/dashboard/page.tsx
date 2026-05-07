'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Listing {
  id: string
  title: string
  image_url: string
  status?: string
}

interface Offer {
  id: string
  message: string
  offered_item: string
  cash_amount: number
  status: string
  listings: {
    title: string
  }
}

export default function DashboardPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [myListings, setMyListings] = useState<Listing[]>([])
  const [receivedOffers, setReceivedOffers] = useState<Offer[]>([])
  const [sentOffers, setSentOffers] = useState<Offer[]>([])

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    await fetchDashboardData(user.id)

    setLoading(false)
  }

  async function fetchDashboardData(userId: string) {

    const { data: listingsData } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    setMyListings(listingsData || [])

    const listingIds =
      listingsData?.map((listing) => listing.id) || []

    if (listingIds.length > 0) {

      const { data: offersReceivedData } = await supabase
        .from('offers')
        .select(`
          *,
          listings (
            title
          )
        `)
        .in('listing_id', listingIds)
        .order('created_at', { ascending: false })

      setReceivedOffers(offersReceivedData || [])
    }

    const { data: sentOffersData } = await supabase
      .from('offers')
      .select(`
        *,
        listings (
          title
        )
      `)
      .eq('sender_id', userId)
      .order('created_at', { ascending: false })

    setSentOffers(sentOffersData || [])
  }
async function updateOfferStatus(
  offerId: string,
  status: string,
  listingId: string
) {

  const { error } = await supabase
    .from('offers')
    .update({ status })
    .eq('id', offerId)

  if (error) {
    alert(error.message)
    return
  }

  if (status === 'accepted') {

    await supabase
      .from('offers')
      .update({ status: 'rejected' })
      .eq('listing_id', listingId)
      .neq('id', offerId)
  }

  setReceivedOffers((prevOffers) =>
    prevOffers.map((offer: any) => {

      if (
        status === 'accepted' &&
        offer.id !== offerId &&
        offer.listing_id === listingId
      ) {
        return {
          ...offer,
          status: 'rejected',
        }
      }

      if (offer.id === offerId) {
        return {
          ...offer,
          status,
        }
      }

      return offer
    })
  )
} {

  const { error } = await supabase
    .from('offers')
    .update({ status })
    .eq('id', offerId)

  if (error) {
    alert(error.message)
    return
  }

  // If accepted, reject all others

  if (status === 'accepted') {

    await supabase
      .from('offers')
      .update({ status: 'rejected' })
      .eq('listing_id', listingId)
      .neq('id', offerId)
  }

  setReceivedOffers((prevOffers) =>
    prevOffers.map((offer) => {

      if (
        status === 'accepted' &&
        offer.id !== offerId &&
        offer.listing_id === listingId
      ) {
        return {
          ...offer,
          status: 'rejected',
        }
      }

      if (offer.id === offerId) {
        return {
          ...offer,
          status,
        }
      }

      return offer
    })
  )
} {

  const { error } = await supabase
    .from('offers')
    .update({ status })
    .eq('id', offerId)

  if (error) {
    alert(error.message)
    return
  }

  // If accepted, reject all others

  if (status === 'accepted') {

    await supabase
      .from('offers')
      .update({ status: 'rejected' })
      .eq('listing_id', listingId)
      .neq('id', offerId)
  }

  setReceivedOffers((prevOffers) =>
    prevOffers.map((offer) => {

      if (
        status === 'accepted' &&
        offer.id !== offerId &&
        offer.listings?.id === listingId
      ) {
        return {
          ...offer,
          status: 'rejected',
        }
      }

      if (offer.id === offerId) {
        return {
          ...offer,
          status,
        }
      }

      return offer
    })
  )
  const { error } = await supabase
    .from('offers')
    .update({ status })
    .eq('id', offerId)

  if (error) {
    alert(error.message)
    return
  }

  setReceivedOffers((prevOffers) =>
    prevOffers.map((offer) =>
      offer.id === offerId
        ? { ...offer, status }
        : offer
    )
  )
}
  async function signOut() {
    await supabase.auth.signOut()

    router.push('/login')
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-bold">
          Loading dashboard...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-5xl font-black">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your listings and offers.
            </p>
          </div>

          <button
            onClick={signOut}
            className="bg-black text-white px-6 py-4 rounded-2xl font-bold"
          >
            Logout
          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* MY LISTINGS */}

          <div className="bg-white rounded-[30px] p-8 shadow-lg border">

            <h2 className="text-3xl font-black mb-6">
              My Listings
            </h2>

            <div className="space-y-5">

              {myListings.length === 0 ? (
                <p>No listings yet.</p>
              ) : (
                myListings.map((listing) => (

                  <div
                    key={listing.id}
                    className="flex items-center gap-4 border rounded-2xl p-4"
                  >

                    <img
                      src={
                        listing.image_url ||
                        'https://placehold.co/100x100'
                      }
                      alt={listing.title}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div>
                      <p className="font-black">
                        {listing.title}
                      </p>
                    </div>

                  </div>

                ))
              )}

            </div>

          </div>

          {/* RECEIVED OFFERS */}

          <div className="bg-white rounded-[30px] p-8 shadow-lg border">

            <h2 className="text-3xl font-black mb-6">
              Offers Received
            </h2>

            <div className="space-y-5">

              {receivedOffers.length === 0 ? (
                <p>No offers received.</p>
              ) : (
                receivedOffers.map((offer) => (

                  <div
                    key={offer.id}
                    className="border rounded-2xl p-5"
                  >

                    <p className="font-black mb-2">
                      {offer.listings?.title}
                    </p>

                    <p className="text-sm text-slate-500 mb-2">
                      Offered Item:
                    </p>

                    <p className="font-semibold mb-4">
                      {offer.offered_item || 'Cash Offer'}
                    </p>

                    <p className="text-sm text-slate-500 mb-2">
                      Message:
                    </p>

                    <p className="mb-4">
                      {offer.message}
                    </p>

                    <div className="flex items-center justify-between">

                      <span className="font-black text-green-600">
                        ${offer.cash_amount}
                      </span>

                     <div className="flex items-center gap-2">

  <span
    className={`
      px-4 py-2 rounded-full text-sm font-bold
      ${
        offer.status === 'accepted'
          ? 'bg-green-100 text-green-700'
          : offer.status === 'rejected'
          ? 'bg-red-100 text-red-700'
          : 'bg-slate-100 text-slate-700'
      }
    `}
  >
    {offer.status}
  </span>

  {offer.status === 'pending' && (

    <div className="flex items-center gap-2">

      <button
        onClick={() =>
          updateOfferStatus(
  offer.id,
  'accepted',
  offer.listing_id
)
        }
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl text-sm font-bold"
      >
        Accept
      </button>

      <button
        onClick={() =>
          updateOfferStatus(
  offer.id,
  'rejected',
  offer.listing_id
)
        }
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm font-bold"
      >
        Reject
      </button>

    </div>

  )}

</div>

                    </div>

                  </div>

                ))
              )}

            </div>

          </div>

          {/* SENT OFFERS */}

          <div className="bg-white rounded-[30px] p-8 shadow-lg border">

            <h2 className="text-3xl font-black mb-6">
              Offers Sent
            </h2>

            <div className="space-y-5">

              {sentOffers.length === 0 ? (
                <p>No offers sent.</p>
              ) : (
                sentOffers.map((offer) => (

                  <div
                    key={offer.id}
                    className="border rounded-2xl p-5"
                  >

                    <p className="font-black mb-2">
                      {offer.listings?.title}
                    </p>

                    <p className="text-sm text-slate-500 mb-2">
                      Offered Item:
                    </p>

                    <p className="font-semibold mb-4">
                      {offer.offered_item || 'Cash Offer'}
                    </p>

                    <p className="text-sm text-slate-500 mb-2">
                      Message:
                    </p>

                    <p className="mb-4">
                      {offer.message}
                    </p>

                    <div className="flex items-center justify-between">

                      <span className="font-black text-green-600">
                        ${offer.cash_amount}
                      </span>

                      <span className="bg-slate-100 px-4 py-2 rounded-full text-sm font-bold">
                        {offer.status}
                      </span>

                    </div>

                  </div>

                ))
              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}