'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutDashboard, Plus, Search, User } from 'lucide-react'

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
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
