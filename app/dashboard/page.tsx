'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {

      router.push('/login')

      return
    }

    setLoading(false)
  }

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-black">
          Loading dashboard...
        </h1>

      </main>
    )
  }

  return (

    <main className="min-h-screen px-6 py-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black mb-6">
          Dashboard
        </h1>

        <p className="text-slate-500 text-lg">
          Welcome back to TROKA.
        </p>

      </div>

    </main>
  )
}