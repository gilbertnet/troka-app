import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-key'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface SellerSeed {
  email: string
  password: string
  displayName: string
}

interface ListingSeed {
  user_id: string
  title: string
  description: string
  category: string
  estimated_value: number
  desired_trade: string
  country: string
  city: string
  image_url: string
  status: 'available' | 'reserved' | 'traded'
  created_at: string
}

const sellerSeeds: SellerSeed[] = [
  { email: 'seller.maria.mx@troka.test', password: 'Rosa1234', displayName: 'Maria Gomez' },
  { email: 'seller.javier.co@troka.test', password: 'Rosa1234', displayName: 'Javier Rojas' },
  { email: 'seller.camila.ar@troka.test', password: 'Rosa1234', displayName: 'Camila Diaz' },
  { email: 'seller.daniel.es@troka.test', password: 'Rosa1234', displayName: 'Daniel Ortega' },
  { email: 'seller.sofia.us@troka.test', password: 'Rosa1234', displayName: 'Sofia Martinez' },
  { email: 'seller.ana.pe@troka.test', password: 'Rosa1234', displayName: 'Ana Valdez' },
]

const categories = [
  'Electronics',
  'Vehicles',
  'Phones',
  'Computers',
  'Gaming',
  'Home',
  'Furniture',
  'Fashion',
  'Sports',
  'Tools',
  'Music',
  'Collectibles',
  'Other',
]

const locations = [
  { country: 'Mexico', city: 'Guadalajara' },
  { country: 'Colombia', city: 'Bogota' },
  { country: 'Argentina', city: 'Buenos Aires' },
  { country: 'Spain', city: 'Madrid' },
  { country: 'United States', city: 'Miami' },
  { country: 'Peru', city: 'Lima' },
  { country: 'Chile', city: 'Santiago' },
  { country: 'Dominican Republic', city: 'Santo Domingo' },
  { country: 'Panama', city: 'Panama City' },
  { country: 'Costa Rica', city: 'San Jose' },
]

async function ensureSellerAccount(seller: SellerSeed): Promise<string | null> {
  const signUpResult = await supabase.auth.signUp({
    email: seller.email,
    password: seller.password,
  })

  if (signUpResult.data.user?.id) {
    return signUpResult.data.user.id
  }

  const signInResult = await supabase.auth.signInWithPassword({
    email: seller.email,
    password: seller.password,
  })

  if (signInResult.data.user?.id) {
    return signInResult.data.user.id
  }

  console.error(`Could not resolve user id for ${seller.email}`, signUpResult.error || signInResult.error)
  return null
}

function randomFrom<T>(items: T[], index: number) {
  return items[index % items.length]
}

function statusByIndex(index: number): 'available' | 'reserved' | 'traded' {
  if (index % 6 === 0 || index % 11 === 0) {
    return 'traded'
  }
  if (index % 5 === 0) {
    return 'reserved'
  }
  return 'available'
}

function createdAtByIndex(index: number) {
  const now = new Date()
  const daysAgo = index % 45
  const date = new Date(now)
  date.setDate(now.getDate() - daysAgo)
  date.setHours(8 + (index % 10), (index * 7) % 60, 0, 0)
  return date.toISOString()
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildListings(userIds: string[]): ListingSeed[] {
  const targetCount = 220
  const rows: ListingSeed[] = []

  for (let index = 0; index < targetCount; index += 1) {
    const sellerId = randomFrom(userIds, index)
    const category = randomFrom(categories, index)
    const location = randomFrom(locations, index + 3)
    const status = statusByIndex(index)
    const image = `https://picsum.photos/seed/troka-${index + 1}/900/900`
    const value = 40 + ((index * 37) % 2900)

    rows.push({
      user_id: sellerId,
      title: `${category} Item ${index + 1}`,
      description: `Sample ${category.toLowerCase()} listing ${index + 1} from ${location.city}. Ideal for exchange or direct sale.`,
      category,
      estimated_value: value,
      desired_trade: `Looking for similar value in ${randomFrom(categories, index + 5)}`,
      country: location.country,
      city: location.city,
      image_url: image,
      status,
      created_at: createdAtByIndex(index),
    })
  }

  return rows
}

async function seedDatabase() {
  console.log('Starting seed process...')

  const sellerUsers: Array<SellerSeed & { id: string }> = []
  for (const seller of sellerSeeds) {
    const userId = await ensureSellerAccount(seller)
    if (userId) {
      sellerUsers.push({ ...seller, id: userId })
    }
    await sleep(700)
  }

  if (sellerUsers.length < 5) {
    console.error('At least 5 seller accounts are required. Seed aborted.')
    return
  }

  const userIds = sellerUsers.map((seller) => seller.id)
  const sampleListings = buildListings(userIds)
  let insertedCount = 0
  for (const seller of sellerUsers) {
    const signIn = await supabase.auth.signInWithPassword({
      email: seller.email,
      password: seller.password,
    })

    if (signIn.error) {
      console.warn(`listing insert skipped for ${seller.email}:`, signIn.error.message)
      continue
    }

    const { error: profileError } = await supabase.from('profiles').upsert(
      [{ id: seller.id, display_name: seller.displayName }],
      { onConflict: 'id' }
    )

    if (profileError) {
      console.warn(`profiles upsert skipped for ${seller.email}:`, profileError.message)
    }

    const sellerListings = sampleListings.filter((listing) => listing.user_id === seller.id)

    const { error: deleteError } = await supabase.from('listings').delete().eq('user_id', seller.id)
    if (deleteError) {
      console.warn(`listing cleanup skipped for ${seller.email}:`, deleteError.message)
    }

    const { data, error } = await supabase.from('listings').insert(sellerListings).select('id')

    if (error) {
      console.error(`Error inserting listings for ${seller.email}:`, error)
      await supabase.auth.signOut()
      continue
    }

    insertedCount += data?.length || 0
    await supabase.auth.signOut()
    await sleep(900)
  }

  console.log(`Created ${sellerUsers.length} seller accounts (or reused existing ones).`)
  sellerSeeds.forEach((seller) => {
    console.log(`Seller login => ${seller.email} / ${seller.password}`)
  })
  console.log(`Inserted ${insertedCount} listings.`)
}

seedDatabase().catch((error) => {
  console.error('Unexpected seed error:', error)
})
