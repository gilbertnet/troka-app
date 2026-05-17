'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/components/LanguageProvider'

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
  const { language } = useLanguage()
  const isEs = language === 'es'
  const listingId = Array.isArray(params.id) ? params.id[0] : params.id

  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [offeredItem, setOfferedItem] = useState('')
  const [cashAmount, setCashAmount] = useState('')
  const [sendingOffer, setSendingOffer] = useState(false)

  const cleanOfferedItem = offeredItem.trim()
  const cleanMessage = message.trim()
  const cleanCashAmount = Number(cashAmount)
  const hasCashOffer = Number.isFinite(cleanCashAmount) && cleanCashAmount > 0
  const canSendOffer =
    cleanMessage !== '' && (cleanOfferedItem !== '' || hasCashOffer)

  useEffect(() => {
    async function fetchListing() {
      if (!listingId) {
        setLoading(false)
        return
      }

      setLoading(true)

      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', listingId)
        .single()

      if (error) {
        console.log(error)
        setListing(null)
        setLoading(false)
        return
      }

      setListing(data)
      setLoading(false)
    }

    fetchListing()
  }, [listingId])

  async function handleMakeOffer() {
    if (!listing) {
      alert(
        isEs
          ? 'Publicacion no encontrada'
          : 'Listing not found'
      )
      return
    }

    if (!canSendOffer) {
      alert(
        isEs
          ? 'Escribe un mensaje y agrega un articulo ofrecido o monto en efectivo'
          : 'Please write a message and add an offered item or cash amount'
      )
      return
    }

    setSendingOffer(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert(
        isEs
          ? 'Debes iniciar sesion primero'
          : 'You must login first'
      )
      setSendingOffer(false)
      return
    }

    const { error } = await supabase.from('offers').insert({
      listing_id: listing.id,
      sender_id: user.id,
      message: cleanMessage,
      offered_item: cleanOfferedItem,
      cash_amount: hasCashOffer ? cleanCashAmount : 0,
    })

    setSendingOffer(false)

    if (error) {
      alert(error.message)
      return
    }

    alert(
      isEs
        ? 'Oferta enviada correctamente'
        : 'Offer sent successfully'
    )

    setMessage('')
    setOfferedItem('')
    setCashAmount('')
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-bold">
          {isEs
            ? 'Cargando publicacion...'
            : 'Loading listing...'}
        </p>
      </main>
    )
  }

  if (!listing) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-bold">
          {isEs
            ? 'Publicacion no encontrada'
            : 'Listing not found'}
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
                {isEs ? 'Intercambio deseado' : 'Desired Trade'}
              </p>

              <p className="font-bold text-lg">
                {listing.desired_trade}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                {isEs ? 'Ubicacion' : 'Location'}
              </p>

              <p className="font-bold text-lg">
                {listing.city}, {listing.country}
              </p>
            </div>

          </div>

          <div className="space-y-5">

            <div>
              <label className="font-bold block mb-2">
                {isEs ? 'Articulo ofrecido' : 'Offered Item'}
              </label>

              <input
                type="text"
                placeholder={isEs ? 'Ejemplo: MacBook Pro' : 'Example: MacBook Pro'}
                className="w-full border rounded-2xl px-5 py-4"
                value={offeredItem}
                onChange={(e) => setOfferedItem(e.target.value)}
              />
            </div>

            <div>
              <label className="font-bold block mb-2">
                {isEs ? 'Efectivo adicional' : 'Additional Cash'}
              </label>

              <input
                type="number"
                placeholder={isEs ? 'Opcional' : 'Optional'}
                className="w-full border rounded-2xl px-5 py-4"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
              />
            </div>

            <div>
              <label className="font-bold block mb-2">
                {isEs ? 'Mensaje' : 'Message'}
              </label>

              <textarea
                placeholder={isEs ? 'Escribe tu propuesta...' : 'Write your proposal...'}
                className="w-full border rounded-2xl px-5 py-4 min-h-[120px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              onClick={handleMakeOffer}
              disabled={sendingOffer || !canSendOffer}
              className={`
                w-full py-5 rounded-2xl font-black text-xl transition
                ${
                  sendingOffer || !canSendOffer
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }
              `}
            >
              {sendingOffer
                ? isEs
                  ? 'Enviando oferta...'
                  : 'Sending Offer...'
                : isEs
                ? 'Hacer oferta'
                : 'Make Offer'}
            </button>

          </div>
        </div>

      </div>

    </main>
  )
}
