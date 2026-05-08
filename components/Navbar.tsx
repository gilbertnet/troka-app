'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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
      '/?search=' +
      encodeURIComponent(search)
    )
  }

  return (

    <nav className="w-full bg-white border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-3 md:px-4 py-4">

        {/* TOP */}

        <div className="flex items-center gap-3">

          {/* LOGO */}

          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-tight whitespace-nowrap"
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
            className="flex-1 relative"
          >

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-full pl-5 pr-12 py-3 text-black text-sm md:text-base"
            />

            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white w-9 h-9 rounded-full flex items-center justify-center"
            >
              🔍
            </button>

          </form>

          {/* USER */}

          {loggedIn ? (

            <div className="relative">

              <button
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition px-3 md:px-4 py-3 rounded-xl font-bold text-sm"
              >

                <span className="max-w-[70px] truncate">
                  {firstName}
                </span>

                <span className="text-xs">
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
              className="bg-black text-white px-4 py-3 rounded-xl font-bold text-sm"
            >
              Login
            </Link>

          )}

        </div>

        {/* CATEGORIES */}

        <div className="flex items-center gap-5 mt-4 overflow-x-auto whitespace-nowrap text-xs md:text-sm font-semibold text-slate-600 pb-2">

          <button
            onClick={() =>
              router.push('/?category=Electronics')
            }
            className="hover:text-green-600 transition"
          >
            Electronics
          </button>

          <button
            onClick={() =>
              router.push('/?category=Vehicles')
            }
            className="hover:text-green-600 transition"
          >
            Vehicles
          </button>

          <button
            onClick={() =>
              router.push('/?category=Real Estate')
            }
            className="hover:text-green-600 transition"
          >
            Real Estate
          </button>

          <button
            onClick={() =>
              router.push('/?category=Services')
            }
            className="hover:text-green-600 transition"
          >
            Services
          </button>

          <button
            onClick={() =>
              router.push('/?category=Fashion')
            }
            className="hover:text-green-600 transition"
          >
            Fashion
          </button>

          <button
            onClick={() =>
              router.push('/?category=Home')
            }
            className="hover:text-green-600 transition"
          >
            Home
          </button>

          <button
            onClick={() =>
              router.push('/?category=Technology')
            }
            className="hover:text-green-600 transition"
          >
            Technology
          </button>

        </div>

      </div>

    </nav>
  )
}