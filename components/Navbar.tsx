'use client'

import Link from 'next/link'
import {
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  usePathname,
  useRouter,
} from 'next/navigation'
import { ChevronDown, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/components/LanguageProvider'

export default function Navbar() {

  const [loggedIn, setLoggedIn] =
    useState(false)

  const [firstName, setFirstName] =
    useState('')

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [search, setSearch] =
    useState('')
  const [logoExploding, setLogoExploding] =
    useState(false)
  const [headerStats, setHeaderStats] =
    useState({
      items: 0,
      available: 0,
      countries: 0,
      value: '$0',
    })

  const router = useRouter()
  const userMenuRef =
    useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const {
    language,
    setLanguage,
    languageNames,
    t,
    localizeCategory,
  } = useLanguage()
  const categories = [
    'Electronics',
    'Vehicles',
    'Real Estate',
    'Services',
    'Fashion',
    'Home',
    'Technology',
  ]

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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void Promise.resolve().then(() => checkUser())
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!menuOpen) return
      if (!userMenuRef.current) return

      const target = event.target as Node
      if (!userMenuRef.current.contains(target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [menuOpen])

  useEffect(() => {
    async function fetchHeaderStats() {
      if (pathname !== '/') return

      const { data, error } = await supabase
        .from('listings')
        .select('estimated_value, status, country')

      if (error || !data) return

      const items = data.length
      const available = data.filter(
        (item) => item.status === 'available'
      ).length
      const countries = new Set(
        data
          .map((item) => item.country)
          .filter(Boolean)
      ).size
      const value = data.reduce(
        (sum, item) =>
          sum + Number(item.estimated_value || 0),
        0
      )

      setHeaderStats({
        items,
        available,
        countries,
        value: new Intl.NumberFormat('en-US', {
          maximumFractionDigits: 0,
          style: 'currency',
          currency: 'USD',
        }).format(value),
      })
    }

    void fetchHeaderStats()
  }, [pathname])

  async function handleLogout() {

    await supabase.auth.signOut()

    router.push('/login')
  }

  function handleLogoClick(
    e: React.MouseEvent<HTMLAnchorElement>
  ) {
    e.preventDefault()
    if (logoExploding) return

    setLogoExploding(true)
    setMenuOpen(false)
    setSearch('')

    window.setTimeout(() => {
      const hasQuery =
        typeof window !== 'undefined' &&
        window.location.search !== ''

      const hasHash =
        typeof window !== 'undefined' &&
        window.location.hash !== ''

      if (pathname === '/' && !hasQuery && !hasHash) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } else {
        router.push('/', { scroll: true })
      }

      setLogoExploding(false)
    }, 420)
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

  const statLabels = {
    en: {
      items: 'ITEMS',
      available: 'AVAILABLE',
      countries: 'COUNTRIES',
      value: 'VALUE',
    },
    es: {
      items: 'PUBLICACIONES',
      available: 'DISPONIBLES',
      countries: 'PAISES',
      value: 'VALOR',
    },
    pt: {
      items: 'ITENS',
      available: 'DISPONIVEIS',
      countries: 'PAISES',
      value: 'VALOR',
    },
    fr: {
      items: 'ARTICLES',
      available: 'DISPONIBLES',
      countries: 'PAYS',
      value: 'VALEUR',
    },
    de: {
      items: 'ARTIKEL',
      available: 'VERFUGBAR',
      countries: 'LANDER',
      value: 'WERT',
    },
    it: {
      items: 'ARTICOLI',
      available: 'DISPONIBILI',
      countries: 'PAESI',
      value: 'VALORE',
    },
  } as const
  const sl = statLabels[language]

  return (

    <nav className="w-full bg-white border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 md:py-4">

        {/* TOP */}

        <div className="flex items-center gap-3">

          {/* LOGO */}

          <Link
            href="/"
            onClick={handleLogoClick}
            scroll
            className={
              'troka-header-logo relative inline-flex items-center rounded-full px-3 py-1.5 md:px-4 md:py-2 whitespace-nowrap select-none transition-transform duration-200 hover:scale-110 ' +
              (logoExploding
                ? 'troka-header-logo--explode'
                : '')
            }
          >

            <span className="troka-header-word text-sm md:text-lg font-black tracking-[0.2em]">
              TROKA
            </span>

            <span className="troka-spark troka-spark-1" />
            <span className="troka-spark troka-spark-2" />
            <span className="troka-spark troka-spark-3" />
            <span className="troka-spark troka-spark-4" />
            <span className="troka-spark troka-spark-5" />
            <span className="troka-spark troka-spark-6" />

          </Link>

          {/* SEARCH */}

          <form
            id="marketplace-search"
            onSubmit={handleSearch}
            className="flex-1 relative"
          >

            <input
              type="text"
              placeholder={t('nav.search')}
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

          <div className="flex items-center gap-2">
            <label
              htmlFor="language-select"
              className="hidden lg:block text-xs font-bold text-slate-500"
            >
              {t('nav.language')}
            </label>

            <select
              id="language-select"
              aria-label={t('nav.languageAria')}
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target
                    .value as typeof language
                )
              }
              className="border rounded-xl px-2 py-2 text-[11px] md:text-sm font-bold bg-white"
            >
              {Object.entries(
                languageNames
              ).map(([code, label]) => (
                <option
                  key={code}
                  value={code}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* USER */}

          {loggedIn ? (

            <div
              ref={userMenuRef}
              className="relative"
            >

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
                    {t('nav.profile')}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-4 hover:bg-slate-100 text-red-500 font-semibold"
                  >
                    {t('nav.logout')}
                  </button>

                </div>

              )}

            </div>

          ) : (
            <Link
              href="/login"
              className="hidden sm:block bg-black text-white px-4 py-3 rounded-xl font-bold text-sm"
            >
              {t('nav.login')}
            </Link>

          )}

        </div>

        {/* CATEGORIES */}

        <div className="mt-3 md:mt-4 flex items-center justify-between gap-3 pb-1 md:pb-2">

          <div className="flex items-center gap-2 md:gap-5 overflow-x-auto whitespace-nowrap text-[11px] md:text-sm font-semibold text-slate-600">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  router.push(
                    '/?category=' +
                    encodeURIComponent(category)
                  )
                }
                className="bg-slate-100 md:bg-transparent px-3 md:px-0 py-1.5 md:py-0 rounded-full hover:text-green-600 transition"
              >
                {localizeCategory(category)}
              </button>
            ))}
          </div>

          {pathname === '/' && (
            <div className="hidden xl:flex items-center justify-end gap-2 text-xs font-black whitespace-nowrap">
              <div className="bg-white border-2 border-slate-300 rounded-full px-3 py-1.5">
                {sl.items} {headerStats.items}
              </div>
              <div className="bg-white border-2 border-green-300 text-green-700 rounded-full px-3 py-1.5">
                {sl.available} {headerStats.available}
              </div>
              <div className="bg-white border-2 border-slate-300 rounded-full px-3 py-1.5">
                {sl.countries} {headerStats.countries}
              </div>
              <div className="bg-white border-2 border-slate-300 rounded-full px-3 py-1.5">
                {sl.value} {headerStats.value}
              </div>
            </div>
          )}

        </div>

      </div>

    </nav>
  )
}
