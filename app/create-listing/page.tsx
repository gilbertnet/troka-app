'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Country, State, City } from 'country-state-city'
import { useLanguage } from '@/components/LanguageProvider'
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
  const { language, localizeCategory } = useLanguage()
  const isEs = language === 'es'
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [desiredTrade, setDesiredTrade] = useState('')
  const [estimatedValue, setEstimatedValue] = useState('')
  //const [city, setCity] = useState('')
  //const [country, setCountry] = useState('Dominican Republic')
  //const [countryCode, setCountryCode] = useState('DO')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('Dominican Republic')
  const [countryCode, setCountryCode] = useState('DO')
  const [stateCode, setStateCode] = useState('')
  const [image, setImage] = useState<File | null>(null)
  async function createListingNow() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
//alert(JSON.stringify(user))
    if (!user) {
      alert(
        isEs
          ? 'Debes iniciar sesion primero'
          : 'You must login first'
      )
      return
    }
let imageUrl = ''

if (image) {
  const fileName = `${Date.now()}-${image.name}`

  const { error: uploadError } = await supabase.storage
    .from('listings')
    .upload(fileName, image)

  if (uploadError) {
    alert(uploadError.message)
    return
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from('listings')
    .getPublicUrl(fileName)

  imageUrl = publicUrl
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
      image_url: imageUrl,
    })

    if (error) {
      alert(error.message)
      return
    }

    alert(
      isEs
        ? 'Publicacion creada correctamente'
        : 'Listing created successfully'
    )
    setTitle('')
    setDescription('')
    setCategory('')
    setDesiredTrade('')
    setEstimatedValue('')
    setCity('')
    setCountry('Dominican Republic')
    setCountryCode('DO')
    setStateCode('')
    setImage(null)
    setTitle('')
    setDescription('')
    setCategory('')
    setDesiredTrade('')
    setEstimatedValue('')
    setCity('')
    setCountry('Dominican Republic')
  }
//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">

      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[40px] shadow-xl border">

        <h1 className="text-5xl font-black mb-3">
          {isEs ? 'Crear publicacion' : 'Create Listing'}
        </h1>

        <p className="text-slate-500 text-lg mb-10">
          {isEs
            ? 'Publica un articulo para intercambiar en Troka.'
            : 'Publish an item for trade on Troka.'}
        </p>

        <div className="space-y-5">

         <div>
  <label className="font-bold block mb-2">
    {isEs ? 'Titulo de la publicacion' : 'Listing Title'}
  </label>

  <input
    type="text"
    placeholder="Example: iPhone 14 Pro Max"
    className="w-full border rounded-2xl px-5 py-4"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <p className="text-sm text-slate-500 mt-2">
    {isEs
      ? 'Escribe un titulo corto y claro para tu articulo.'
      : 'Write a short and clear title for your item.'}
  </p>
</div>
          

          <div>
  <label className="font-bold block mb-2">
    {isEs ? 'Categoria' : 'Category'}
  </label>

  <select
    className="w-full border rounded-2xl px-5 py-4 bg-white"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">{isEs ? 'Selecciona categoria' : 'Select category'}</option>

    {categories.map((item) => (
      <option key={item} value={item}>
        {localizeCategory(item)}
      </option>
    ))}
  </select>

  <p className="text-sm text-slate-500 mt-2">
    {isEs
      ? 'Elige la categoria que mejor describe tu articulo.'
      : 'Choose the category that best describes your item.'}
  </p>
</div>

          <div>
  <label className="font-bold block mb-2">
    {isEs ? 'Descripcion' : 'Description'}
  </label>

  <textarea
    placeholder="Describe condition, accessories, usage, etc."
    className="w-full border rounded-2xl px-5 py-4 min-h-[150px]"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <p className="text-sm text-slate-500 mt-2">
    {isEs
      ? 'Incluye estado, accesorios y detalles importantes.'
      : 'Include condition, included items, and important details.'}
  </p>
</div>

         <div>
  <label className="font-bold block mb-2">
    {isEs ? 'Intercambio deseado' : 'Desired Trade'}
  </label>

  <input
    type="text"
    placeholder="Example: Laptop, motorcycle or cash"
    className="w-full border rounded-2xl px-5 py-4"
    value={desiredTrade}
    onChange={(e) => setDesiredTrade(e.target.value)}
  />

  <p className="text-sm text-slate-500 mt-2">
    {isEs
      ? 'Explica que tipo de articulo o intercambio buscas.'
      : 'Explain what type of item or exchange you are looking for.'}
  </p>
</div>

          <div>
  <label className="font-bold block mb-2">
    {isEs ? 'Valor estimado' : 'Estimated Value'}
  </label>

  <input
    type="number"
    placeholder="Example: 1200"
    className="w-full border rounded-2xl px-5 py-4"
    value={estimatedValue}
    onChange={(e) => setEstimatedValue(e.target.value)}
  />

  <p className="text-sm text-slate-500 mt-2">
    {isEs
      ? 'Valor aproximado de mercado en USD.'
      : 'Approximate market value of your item in USD.'}
  </p>
</div>
<div>
  <label className="font-bold block mb-2">
    {isEs ? 'Pais' : 'Country'}
  </label>

  <select
    className="w-full border rounded-2xl px-5 py-4 bg-white"
    value={countryCode}
    onChange={(e) => {
      setCountryCode(e.target.value)

      const selectedCountry = Country.getAllCountries().find(
        (c) => c.isoCode === e.target.value
      )

      setCountry(selectedCountry?.name || '')
      setCity('')
    }}
  >
    {Country.getAllCountries().map((country) => (
      <option
        key={country.isoCode}
        value={country.isoCode}
      >
        {country.name}
      </option>
    ))}
  </select>

  <p className="text-sm text-slate-500 mt-2">
    {isEs ? 'Selecciona tu pais.' : 'Select your country.'}
  </p>
</div>
<div>
  <label className="font-bold block mb-2">
    {isEs ? 'Estado / Provincia' : 'State / Province'}
  </label>

  <select
    className="w-full border rounded-2xl px-5 py-4 bg-white"
    value={stateCode}
    onChange={(e) => setStateCode(e.target.value)}
  >
    <option value="">
      {isEs
        ? 'Selecciona estado o provincia'
        : 'Select state or province'}
    </option>

    {State.getStatesOfCountry(countryCode).map((state) => (
      <option
        key={state.isoCode}
        value={state.isoCode}
      >
        {state.name}
      </option>
    ))}
  </select>

  <p className="text-sm text-slate-500 mt-2">
    {isEs
      ? 'Selecciona tu provincia o estado.'
      : 'Select your province or state.'}
  </p>
</div>
          <div>
  <label className="font-bold block mb-2">
    {isEs ? 'Ciudad' : 'City'}
  </label>

  <select
    className="w-full border rounded-2xl px-5 py-4 bg-white"
    value={city}
    onChange={(e) => setCity(e.target.value)}
  >
    <option value="">
      {isEs ? 'Selecciona ciudad' : 'Select city'}
    </option>

    {City.getCitiesOfCountry(countryCode)?.map((cityItem) => (
      <option
        key={cityItem.name}
        value={cityItem.name}
      >
        {cityItem.name}
      </option>
    ))}
  </select>

  <p className="text-sm text-slate-500 mt-2">
    {isEs
      ? 'Selecciona la ciudad donde esta el articulo.'
      : 'Select the city where the item is located.'}
  </p>
</div>
<div>
  <label className="font-bold block mb-2">
    {isEs ? 'Imagen de la publicacion' : 'Listing Image'}
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files?.[0]) {
        setImage(e.target.files[0])
      }
    }}
    className="w-full border rounded-2xl px-5 py-4 bg-white"
  />

  <p className="text-sm text-slate-500 mt-2">
    {isEs
      ? 'Sube una foto clara de tu articulo.'
      : 'Upload a clear photo of your item.'}
  </p>
 </div>
          <button
            onClick={createListingNow}
            className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-lg"
          >
            {isEs
              ? 'Publicar publicacion'
              : 'Publish Listing'}
          </button>

        </div>

      </div>

    </main>
  )
}
