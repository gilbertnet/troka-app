'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/auth'

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister() {
    setLoading(true)

    const { error } = await signUp(email, password)

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert('Account created successfully')

    router.push('/login')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white p-10 rounded-[40px] shadow-xl border">

        <h1 className="text-5xl font-black mb-3">
          Create Account
        </h1>

        <p className="text-slate-500 mb-8 text-lg">
          Join the Troka marketplace.
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
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-500 text-white py-4 rounded-2xl font-black text-lg"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>

        </div>
      </div>
    </main>
  )
}