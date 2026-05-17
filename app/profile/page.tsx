'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/components/LanguageProvider'

interface UserProfile {
  id: string
  email: string
  displayName: string
}

export default function ProfilePage() {
  const router = useRouter()
  const { language } = useLanguage()
  const isEs = language === 'es'

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] =
    useState<UserProfile | null>(null)

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const email = user.email || ''
      const defaultName = email
        ? email.split('@')[0]
        : user.id.slice(0, 8)

      const { data: profileData } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', user.id)
        .single()

      setProfile({
        id: user.id,
        email,
        displayName:
          profileData?.display_name || defaultName,
      })
      setLoading(false)
    }

    void loadProfile()
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-bold">
          {isEs
            ? 'Cargando perfil...'
            : 'Loading profile...'}
        </p>
      </main>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[30px] p-8 md:p-10 shadow-lg border">
        <h1 className="text-4xl md:text-5xl font-black mb-3">
          {isEs ? 'Perfil' : 'Profile'}
        </h1>

        <p className="text-slate-500 mb-8">
          {isEs
            ? 'Informacion de tu cuenta en Troka.'
            : 'Your Troka account information.'}
        </p>

        <div className="space-y-5">
          <div className="border rounded-2xl p-4">
            <p className="text-xs uppercase font-bold text-slate-500 mb-1">
              {isEs ? 'Nombre' : 'Name'}
            </p>
            <p className="text-lg font-black">
              {profile.displayName}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <p className="text-xs uppercase font-bold text-slate-500 mb-1">
              Email
            </p>
            <p className="text-lg font-black break-all">
              {profile.email}
            </p>
          </div>

          <div className="border rounded-2xl p-4">
            <p className="text-xs uppercase font-bold text-slate-500 mb-1">
              {isEs ? 'ID de usuario' : 'User ID'}
            </p>
            <p className="text-sm md:text-base font-semibold break-all">
              {profile.id}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
