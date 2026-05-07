'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const categories = [
  'Electronics',
  'Vehicles',
  'Phones',
  'Computers',
  'Gaming',
  'Home',
  'Furniture',
  'Fashion',
  'Sports',
  'Tools',
  'Music',
  'Collectibles',
  'Other',
]

export default function CreateListingPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [desiredTrade, setDesiredTrade] = useState('')
  const [estimatedValue, setEstimatedValue] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('Dominican Republic')

  async function handleCreateListing() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('You must login first')
      return
    }

    const { error } = await supabase.from('listings').insert({
      user_id: user.id,
      title,
      description,
      category,
      desired_trade: desiredTrade,
      estimated_value: Number(estimatedValue),
      city,
      country,
    })

    if (error) {
      alert(error.message)
      return
    }

    alert('Listing created successfully')

    setTitle('')
    setDescription('')
    setCategory('')
    setDesiredTrade('')
    setEstimatedValue('')
    setCity('')
    setCountry('Dominican Republic')
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">

      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[40px] shadow-xl border">

        <h1 className="text-5xl font-black mb-3">
          Create Listing
        </h1>

        <p className="text-slate-500 text-lg mb-10">
          Publish an item for trade on Troka.
        </p>

        <div className="space-y-5">

         <div>
  <label className="font-bold block mb-2">
    Listing Title
  </label>

  <input
    type="text"
    placeholder="Example: iPhone 14 Pro Max"
    className="w-full border rounded-2xl px-5 py-4"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <p className="text-sm text-slate-500 mt-2">
    Write a short and clear title for your item.
  </p>
</div>
          

          <div>
  <label className="font-bold block mb-2">
    Category
  </label>

  <select
    className="w-full border rounded-2xl px-5 py-4 bg-white"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">Select category</option>

    {categories.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ))}
  </select>

  <p className="text-sm text-slate-500 mt-2">
    Choose the category that best describes your item.
  </p>
</div>

          <div>
  <label className="font-bold block mb-2">
    Description
  </label>

  <textarea
    placeholder="Describe condition, accessories, usage, etc."
    className="w-full border rounded-2xl px-5 py-4 min-h-[150px]"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <p className="text-sm text-slate-500 mt-2">
    Include condition, included items, and important details.
  </p>
</div>

         <div>
  <label className="font-bold block mb-2">
    Desired Trade
  </label>

  <input
    type="text"
    placeholder="Example: Laptop, motorcycle or cash"
    className="w-full border rounded-2xl px-5 py-4"
    value={desiredTrade}
    onChange={(e) => setDesiredTrade(e.target.value)}
  />

  <p className="text-sm text-slate-500 mt-2">
    Explain what type of item or exchange you are looking for.
  </p>
</div>

          <div>
  <label className="font-bold block mb-2">
    Estimated Value
  </label>

  <input
    type="number"
    placeholder="Example: 1200"
    className="w-full border rounded-2xl px-5 py-4"
    value={estimatedValue}
    onChange={(e) => setEstimatedValue(e.target.value)}
  />

  <p className="text-sm text-slate-500 mt-2">
    Approximate market value of your item in USD.
  </p>
</div>

          <<div>
  <label className="font-bold block mb-2">
    City
  </label>

  <input
    type="text"
    placeholder="Example: Santiago"
    className="w-full border rounded-2xl px-5 py-4"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  />

  <p className="text-sm text-slate-500 mt-2">
    Enter the city where the item is located.
  </p>
</div>

          <div>
  <label className="font-bold block mb-2">
    Country
  </label>

  <input
    type="text"
    placeholder="Example: Dominican Republic"
    className="w-full border rounded-2xl px-5 py-4"
    value={country}
    onChange={(e) => setCountry(e.target.value)}
  />

  <p className="text-sm text-slate-500 mt-2">
    Country where the exchange can take place.
  </p>
</div>

          <button
            onClick={handleCreateListing}
            className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-lg"
          >
            Publish Listing
          </button>

        </div>

      </div>

    </main>
  )
}