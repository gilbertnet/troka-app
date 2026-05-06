'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)

    const { error } = await signIn(email, password)

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">

      <div className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-xl border">

        <h1 className="text-5xl font-black mb-3">
          Welcome Back
        </h1>

        <p className="text-slate-500 mb-8 text-lg">
          Login to continue using Troka.
        </p>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-2xl px-5 py-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-2xl px-5 py-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-500 text-white py-4 rounded-2xl font-black text-lg"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </div>
      </div>
    </main>
  )
}