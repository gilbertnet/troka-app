'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutDashboard, Plus, Search, User } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'

const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/#marketplace-search',
    label: 'Search',
    icon: Search,
  },
  {
    href: '/create-listing',
    label: 'Create',
    icon: Plus,
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/login',
    label: 'Login',
    icon: User,
  },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { language } = useLanguage()

  const labelsByLanguage = {
    en: {
      Home: 'Home',
      Search: 'Search',
      Create: 'Create',
      Dashboard: 'Dashboard',
      Login: 'Login',
    },
    es: {
      Home: 'Inicio',
      Search: 'Buscar',
      Create: 'Crear',
      Dashboard: 'Panel',
      Login: 'Entrar',
    },
    pt: {
      Home: 'In\u00edcio',
      Search: 'Buscar',
      Create: 'Criar',
      Dashboard: 'Painel',
      Login: 'Entrar',
    },
    fr: {
      Home: 'Accueil',
      Search: 'Recherche',
      Create: 'Cr\u00e9er',
      Dashboard: 'Tableau',
      Login: 'Connexion',
    },
    de: {
      Home: 'Start',
      Search: 'Suche',
      Create: 'Erstellen',
      Dashboard: 'Dashboard',
      Login: 'Login',
    },
    it: {
      Home: 'Home',
      Search: 'Cerca',
      Create: 'Crea',
      Dashboard: 'Pannello',
      Login: 'Accedi',
    },
  } as const

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-5 px-2 pb-3 pt-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active =
            item.label === 'Search'
              ? false
              : item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href.split('?')[0])

          return (
            <Link
              href={item.href}
              key={item.label}
              className={
                'flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-[10px] font-black transition ' +
                (
                  active
                    ? 'text-green-600'
                    : 'text-slate-500'
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>
                {
                  labelsByLanguage[
                    language
                  ][
                    item.label as keyof (typeof labelsByLanguage)['en']
                  ]
                }
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
