'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Navbar() {

  //const [loggedIn, setLoggedIn] =
  //useState(false)
  const [loggedIn, setLoggedIn] =
  useState(false)
  const [firstName, setFirstName] =
  useState('')
  const [menuOpen, setMenuOpen] =
  useState(false)
  const [search, setSearch] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] =
  useState(false)
  const router = useRouter()
  useEffect(() => {
    checkUser()
  }, [])

async function checkUser() {

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {

    setLoggedIn(true)

    const email =
      user.email || ''

    const first =
      email.split('@')[0]

    const cleanName =
      first.charAt(0).toUpperCase() +
      first.slice(1)

    setFirstName(cleanName)

  } else {

    setLoggedIn(false)
  }
}

  async function handleLogout() {

    await supabase.auth.signOut()

    window.location.href = '/login'
  }
  function handleSearch(
  e: React.FormEvent
) {
  e.preventDefault()

  if (!search.trim()) return

  router.push(
    `/?search=${encodeURIComponent(search)}`
  )
}

  return (
  <nav className="w-full bg-white border-b sticky top-0 z-50">

    <div className="max-w-7xl mx-auto px-4 py-4">

      {/* TOP ROW */}

      <div className="flex flex-col md:flex-row md:items-center gap-4">

        {/* LOGO */}

        <Link
          href="/"
          className="text-3xl font-black tracking-tight whitespace-nowrap"
        >
          <span className="text-black">
            TRO
          </span>

          <span className="text-green-500">
            KA
          </span>
        </Link>

        {/* SEARCH */}

        <form
          onSubmit={handleSearch}
          className="w-full flex flex-col md:flex-row md:flex-1 items-stretch md:items-center gap-2"
        >

          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:flex-1 border rounded-xl px-4 py-3 text-black"
          />

          <button
            type="submit"
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-bold"
          >
            Search
          </button>

        </form>

        {/* AUTH */}

        {loggedIn ? (

  <div className="relative">

    <button
      onClick={() =>
        setMenuOpen(!menuOpen)
      }
      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition px-4 py-3 rounded-xl font-bold"
    >

      <span>
        {firstName}
      </span>

      <span className="text-sm">
        ▼
      </span>

    </button>

    {menuOpen && (

      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-2xl shadow-xl overflow-hidden z-50">

        <button
          onClick={() => {
            setMenuOpen(false)
            router.push('/profile')
          }}
          className="w-full text-left px-5 py-4 hover:bg-slate-100 font-semibold"
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-5 py-4 hover:bg-slate-100 text-red-500 font-semibold"
        >
          Logout
        </button>

      </div>

    )}

  </div>

) : (

   <Link
    href="/login"
    className="bg-black text-white px-5 py-3 rounded-xl font-bold"
  >
    Login
  </Link>

)}

      <div className="flex items-center gap-5 mt-4 text-sm font-semibold text-slate-600">

        <Link
          href="/"
          className="hover:text-green-600 transition"
        >
          Home
        </Link>

        <Link
          href="/create-listing"
          className="hover:text-green-600 transition"
        >
          Create Listing
        </Link>

        <Link
          href="/dashboard"
          className="hover:text-green-600 transition"
        >
          Dashboard
        </Link>

      </div>

    </div>

  </nav>
)
}