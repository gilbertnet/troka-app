'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {

  const router = useRouter()

  const [loading, setLoading] =
    useState(true)

  const [userLoaded, setUserLoaded] =
    useState(false)

  useEffect(() => {

    async function loadUser() {

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {

        setUserLoaded(true)

        setLoading(false)

      } else {

        setLoading(false)
      }
    }

    loadUser()

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {

        if (session) {

          setUserLoaded(true)

        } else {

          setUserLoaded(false)
        }

        setLoading(false)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }

  }, [])

  useEffect(() => {

    if (!loading && !userLoaded) {

      router.push('/login')
    }

  }, [loading, userLoaded])

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

    <main className="min-h-screen px-6 py-10 bg-slate-100">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black mb-4">
          Dashboard
        </h1>

        <p className="text-slate-500 text-lg mb-10">
          Welcome back to TROKA.
        </p>

      </div>

    </main>
  )
}