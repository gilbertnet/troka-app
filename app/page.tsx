import { Suspense } from 'react'
import ListingsBrowser from '@/components/ListingsBrowser'

function ListingsFallback() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black">
          Loading listings...
        </h1>
      </div>
    </main>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<ListingsFallback />}>
      <ListingsBrowser />
    </Suspense>
  )
}
