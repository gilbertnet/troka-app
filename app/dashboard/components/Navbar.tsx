'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Navbar() {

  const [loggedIn, setLoggedIn] = useState(false)

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

          </div>

        </div>

        <div>

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

    </nav>
  )
}