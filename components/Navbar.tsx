'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Navbar() {

  const [loggedIn, setLoggedIn] =
    useState(false)

  const [firstName, setFirstName] =
    useState('')

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [search, setSearch] =
    useState('')

  const router = useRouter()

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

  useEffect(() => {
    void Promise.resolve().then(() => checkUser())
  }, [])

  async function handleLogout() {

    await supabase.auth.signOut()

    window.location.href = '/login'
  }

  function handleSearch(
    e: React.FormEvent
  ) {

    e.preventDefault()

    const cleanSearch =
      search.trim()

    if (!cleanSearch) {

      router.push('/')

      return
    }

    router.push(
      '/?search=' +
      encodeURIComponent(cleanSearch)
    )
  }

  return (

    <nav className="w-full bg-white border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4">

        {/* TOP */}

        <div className="flex items-center gap-3">

          {/* LOGO */}

          <Link
            href="/"
            className="text-xl md:text-3xl font-black tracking-tight whitespace-nowrap"
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
            id="marketplace-search"
            onSubmit={handleSearch}
            className="flex-1 relative"
          >

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-full pl-4 md:pl-5 pr-11 md:pr-12 py-2.5 md:py-3 text-black text-sm md:text-base"
            />

            <button
              type="submit"
              aria-label="Search listings"
              className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center"
            >
              <Search className="h-4 w-4" />
            </button>

          </form>

          {/* USER */}

          {loggedIn ? (

            <div className="relative">

              <button
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition px-3 md:px-4 py-2.5 md:py-3 rounded-xl font-bold text-sm"
              >

                <span className="max-w-[70px] truncate">
                  {firstName}
                </span>

                <ChevronDown className="h-4 w-4" />

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
              className="hidden sm:block bg-black text-white px-4 py-3 rounded-xl font-bold text-sm"
            >
              Login
            </Link>

          )}

        </div>

        {/* CATEGORIES */}

        <div className="flex items-center gap-2 md:gap-5 mt-3 md:mt-4 overflow-x-auto whitespace-nowrap text-[11px] md:text-sm font-semibold text-slate-600 pb-1 md:pb-2">

          <button
            onClick={() =>
              window.location.href =
                '/?category=Electronics'
            }
            className="bg-slate-100 md:bg-transparent px-3 md:px-0 py-1.5 md:py-0 rounded-full hover:text-green-600 transition"
          >
            Electronics
          </button>

          <button
            onClick={() =>
              window.location.href =
                '/?category=Vehicles'
            }
            className="bg-slate-100 md:bg-transparent px-3 md:px-0 py-1.5 md:py-0 rounded-full hover:text-green-600 transition"
          >
            Vehicles
          </button>

          <button
            onClick={() =>
              window.location.href =
                '/?category=Real Estate'
            }
            className="bg-slate-100 md:bg-transparent px-3 md:px-0 py-1.5 md:py-0 rounded-full hover:text-green-600 transition"
          >
            Real Estate
          </button>

          <button
            onClick={() =>
              window.location.href =
                '/?category=Services'
            }
            className="bg-slate-100 md:bg-transparent px-3 md:px-0 py-1.5 md:py-0 rounded-full hover:text-green-600 transition"
          >
            Services
          </button>

          <button
            onClick={() =>
              window.location.href =
                '/?category=Fashion'
            }
            className="bg-slate-100 md:bg-transparent px-3 md:px-0 py-1.5 md:py-0 rounded-full hover:text-green-600 transition"
          >
            Fashion
          </button>

          <button
            onClick={() =>
              window.location.href =
                '/?category=Home'
            }
            className="bg-slate-100 md:bg-transparent px-3 md:px-0 py-1.5 md:py-0 rounded-full hover:text-green-600 transition"
          >
            Home
          </button>

          <button
            onClick={() =>
              window.location.href =
                '/?category=Technology'
            }
            className="bg-slate-100 md:bg-transparent px-3 md:px-0 py-1.5 md:py-0 rounded-full hover:text-green-600 transition"
          >
            Technology
          </button>

        </div>

      </div>

    </nav>
  )
}
