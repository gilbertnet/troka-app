'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false)
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

    setLoggedIn(!!user)
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

      <div className="flex items-center gap-4">

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
          className="flex-1 flex items-center gap-2"
        >

          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 border rounded-xl px-4 py-3 text-black"
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-bold"
          >
            Search
          </button>

        </form>

        {/* AUTH */}

        {loggedIn ? (

          <button
            onClick={handleLogout}
            className="bg-black text-white px-5 py-3 rounded-xl font-bold"
          >
            Logout
          </button>

        ) : (

          <Link
            href="/login"
            className="bg-black text-white px-5 py-3 rounded-xl font-bold"
          >
            Login
          </Link>

        )}

      </div>

      {/* BOTTOM ROW */}

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