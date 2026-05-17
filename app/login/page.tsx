'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault()

    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {

      alert(error.message)

      setLoading(false)

      return
    }

    router.push('/dashboard')

    router.refresh()
  }

  return (

    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-[30px] shadow-xl p-10 border">

        <h1 className="text-4xl font-black mb-3">
          Welcome Back
        </h1>

        <p className="text-slate-500 mb-8">
          Sign in to continue using TROKA.
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-2xl px-5 py-4 text-black"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-2xl px-5 py-4 text-black"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 transition text-white py-4 rounded-2xl font-black text-lg"
          >

            {loading
              ? 'Signing In...'
              : 'Login'}

          </button>

        </form>

        <p className="text-center text-slate-500 mt-8">

          Don&apos;t have an account?{' '}

          <Link
            href="/register"
            className="text-green-600 font-bold"
          >
            Register
          </Link>

        </p>

      </div>

    </main>
  )
}