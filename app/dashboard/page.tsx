'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, signOut } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')

  useEffect(() => {
    async function loadUser() {
      const user = await getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setEmail(user.email || '')
    }

    loadUser()
  }, [])

  async function handleLogout() {
    await signOut()

    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-slate-50 p-10">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-[40px] p-10 border shadow-sm">

          <div className="flex items-center justify-between mb-10">

            <div>
              <h1 className="text-5xl font-black mb-3">
                Dashboard
              </h1>

              <p className="text-slate-500 text-lg">
                Logged in as {email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-4 rounded-2xl font-black"
            >
              Logout
            </button>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-slate-100 rounded-[30px] p-8">
              <h2 className="text-4xl font-black mb-2">0</h2>
              <p className="text-slate-500">Listings</p>
            </div>

            <div className="bg-slate-100 rounded-[30px] p-8">
              <h2 className="text-4xl font-black mb-2">0</h2>
              <p className="text-slate-500">Trade Offers</p>
            </div>

            <div className="bg-slate-100 rounded-[30px] p-8">
              <h2 className="text-4xl font-black mb-2">0</h2>
              <p className="text-slate-500">Messages</p>
            </div>

          </div>

        </div>

      </div>

    </main>
  )
}