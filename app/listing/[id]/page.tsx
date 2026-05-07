'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Listing {
  id: string
  title: string
  description: string
  category: string
  city: string
  country: string
  estimated_value: number
  desired_trade: string
  image_url: string
}

export default function ListingDetailsPage() {
  const params = useParams()

  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [offeredItem, setOfferedItem] = useState('')
  const [cashAmount, setCashAmount] = useState('')
  const [sendingOffer, setSendingOffer] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchListing()
    }
  }, [params.id])

  async function fetchListing() {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.log(error)
      return
    }
async function handleMakeOffer() {
  setSendingOffer(true)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    alert('You must login first')
    setSendingOffer(false)
    return
  }
const cleanOfferedItem = offeredItem.trim()
const cleanMessage = message.trim()
const cleanCashAmount = Number(cashAmount)

if (
  cleanOfferedItem === '' &&
  (!cleanCashAmount || cleanCashAmount <= 0)
) {
  alert('Please add an offered item or cash amount')

  setSendingOffer(false)
  return
}

if (cleanMessage === '') {
  alert('Please write a message')

  setSendingOffer(false)
  return
}
{
  alert('Please add an offered item or cash amount')

  setSendingOffer(false)
  return
}

if (!message.trim()) {
  alert('Please write a message')

  setSendingOffer(false)
  return
}
 {
  alert('Please add an offered item or cash amount')

  setSendingOffer(false)
  return
}

if (!message.trim()) {
  alert('Please write a message')

  setSendingOffer(false)
  return
}
  const { error } = await supabase.from('offers').insert({
    listing_id: listing?.id,
    sender_id: user!.id,
    message,
    offered_item: cleanOfferedItem,
    cash_amount: cleanCashAmount,
  })

  setSendingOffer(false)

  if (error) {
  alert(error?.message || 'Unknown error')
  return
}

  alert('Offer sent successfully')

  setMessage('')
  setOfferedItem('')
  setCashAmount('')
}
    setListing(data)
    setLoading(false)
  }
  async function handleMakeOffer() {
  setSendingOffer(true)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    alert('You must login first')
    setSendingOffer(false)
    return
  }

  const { error } = await supabase.from('offers').insert({
    listing_id: listing?.id,
    sender_id: user!.id,
    message,
    offered_item: offeredItem,
    cash_amount: Number(cashAmount),
  })

  setSendingOffer(false)

  if (error) {
    alert(error.message)
    return
  }

  alert('Offer sent successfully')

  setMessage('')
  setOfferedItem('')
  setCashAmount('')
}

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-bold">
          Loading listing...
        </p>
      </main>
    )
  }

  if (!listing) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-bold">
          Listing not found
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-6">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">

        <div className="bg-white rounded-[30px] overflow-hidden shadow-lg border">

          <img
            src={
              listing.image_url ||
              'https://placehold.co/800x600?text=No+Image'
            }
            alt={listing.title}
            className="w-full h-full object-cover"
          />

        </div>

        <div className="bg-white rounded-[30px] p-10 shadow-lg border">

          <div className="flex items-center justify-between mb-5">

            <span className="bg-slate-100 px-4 py-2 rounded-full font-semibold">
              {listing.category}
            </span>

            <span className="text-3xl font-black text-green-600">
              ${listing.estimated_value}
            </span>

          </div>

          <h1 className="text-5xl font-black mb-6">
            {listing.title}
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            {listing.description}
          </p>

          <div className="space-y-4 mb-10">

            <div>
              <p className="text-sm text-slate-500">
                Desired Trade
              </p>

              <p className="font-bold text-lg">
                {listing.desired_trade}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Location
              </p>

              <p className="font-bold text-lg">
                {listing.city}, {listing.country}
              </p>
            </div>

          </div>

          <div className="space-y-5">

  <div>
    <label className="font-bold block mb-2">
      Offered Item
    </label>

    <input
      type="text"
      placeholder="Example: MacBook Pro"
      className="w-full border rounded-2xl px-5 py-4"
      value={offeredItem}
      onChange={(e) => setOfferedItem(e.target.value)}
    />
  </div>

  <div>
    <label className="font-bold block mb-2">
      Additional Cash
    </label>

    <input
      type="number"
      placeholder="Optional"
      className="w-full border rounded-2xl px-5 py-4"
      value={cashAmount}
      onChange={(e) => setCashAmount(e.target.value)}
    />
  </div>

  <div>
    <label className="font-bold block mb-2">
      Message
    </label>

    <textarea
      placeholder="Write your proposal..."
      className="w-full border rounded-2xl px-5 py-4 min-h-[120px]"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
  </div>

  <<button
  onClick={handleMakeOffer}
  disabled={
    sendingOffer ||
    (
      message.trim() === '' ||
      (
        offeredItem.trim() === '' &&
        (!cashAmount || Number(cashAmount) <= 0)
      )
    )
  }
  className={`
    w-full py-5 rounded-2xl font-black text-xl transition
    ${
      sendingOffer ||
      (
        message.trim() === '' ||
        (
          offeredItem.trim() === '' &&
          (!cashAmount || Number(cashAmount) <= 0)
        )
      )
        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
        : 'bg-green-500 hover:bg-green-600 text-white'
    }
  `}
>
  {sendingOffer ? 'Sending Offer...' : 'Make Offer'}
</button>

</div>
        </div>

      </div>

    </main>
  )
}