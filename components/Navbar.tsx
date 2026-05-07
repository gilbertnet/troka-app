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

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-8">

          <Link
            href="/"
            className="text-3xl font-black"
          >
            TROKA
          </Link>

          <div className="hidden md:flex items-center gap-5">

  <Link
    href="/"
    className="font-semibold hover:text-green-600 transition"
  >
    Home
  </Link>

  <Link
    href="/create-listing"
    className="font-semibold hover:text-green-600 transition"
  >
    Create Listing
  </Link>

  <Link
    href="/dashboard"
    className="font-semibold hover:text-green-600 transition"
  >
    Dashboard
  </Link>

  <form
    onSubmit={handleSearch}
    className="ml-4"
  >

    <input
      type="text"
      placeholder="Search listings..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="border rounded-xl px-4 py-2 w-[250px]"
    />

  </form>

</div>

        </div>

        <div className="flex items-center gap-3">

  {/* MOBILE MENU BUTTON */}

  <button
    onClick={() =>
      setMobileMenuOpen(!mobileMenuOpen)
    }
    className="md:hidden bg-slate-100 px-4 py-3 rounded-xl font-black"
  >
    ☰
  </button>

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
      className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-3 rounded-xl font-bold"
    >
      Login
    </Link>

  )}

</div>

      </div>
{/* MOBILE MENU */}

{mobileMenuOpen && (

  <div className="md:hidden border-t bg-white px-6 py-6 space-y-5">

    <Link
      href="/"
      className="block font-bold text-lg"
      onClick={() =>
        setMobileMenuOpen(false)
      }
    >
      Home
    </Link>

    <Link
      href="/create-listing"
      className="block font-bold text-lg"
      onClick={() =>
        setMobileMenuOpen(false)
      }
    >
      Create Listing
    </Link>

    <Link
      href="/dashboard"
      className="block font-bold text-lg"
      onClick={() =>
        setMobileMenuOpen(false)
      }
    >
      Dashboard
    </Link>

    <form
      onSubmit={handleSearch}
      className="pt-4"
    >

      <input
        type="text"
        placeholder="Search listings..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl px-4 py-3"
      />

    </form>

  </div>

)}
    </nav>
  )
}