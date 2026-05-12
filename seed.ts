import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-key'

console.log('Supabase URL:', supabaseUrl)
console.log('Using anon key:', supabaseAnonKey ? 'Yes' : 'No')

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface SampleListing {
  user_id: string
  title: string
  description: string
  category: string
  estimated_value: number
  desired_trade: string
  country: string
  city: string
  image_url: string
  status: string
}

const sampleListings: SampleListing[] = [
  // Electronics (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Wireless Bluetooth Headphones',
    description: 'High-quality noise-canceling wireless headphones with 30-hour battery life. Perfect for music lovers and professionals.',
    category: 'Electronics',
    estimated_value: 150,
    desired_trade: 'Smartphone or tablet',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Smart TV 55 inch 4K',
    description: 'Samsung 55-inch 4K UHD Smart TV with HDR and built-in streaming apps. Excellent condition, less than a year old.',
    category: 'Electronics',
    estimated_value: 800,
    desired_trade: 'Gaming console or laptop',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Wireless Charging Pad',
    description: 'Fast wireless charger compatible with all Qi-enabled devices. Includes USB-C cable and wall adapter.',
    category: 'Electronics',
    estimated_value: 25,
    desired_trade: 'Phone accessories or small electronics',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Bluetooth Speaker Portable',
    description: 'Waterproof portable Bluetooth speaker with 12-hour battery life and excellent sound quality.',
    category: 'Electronics',
    estimated_value: 80,
    desired_trade: 'Headphones or phone case',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'USB-C Hub Multiport',
    description: '7-in-1 USB-C hub with HDMI, USB ports, SD card slots, and Ethernet. Perfect for laptop users.',
    category: 'Electronics',
    estimated_value: 45,
    desired_trade: 'Cables or adapters',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400',
    status: 'available'
  },

  // Vehicles (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Mountain Bike Trek 2020',
    description: 'Trek mountain bike in excellent condition, 21-speed, aluminum frame. Perfect for trails and city riding.',
    category: 'Vehicles',
    estimated_value: 400,
    desired_trade: 'Cash or motorcycle helmet',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Honda Motorcycle 125cc',
    description: 'Honda CG 125cc motorcycle, well maintained, low mileage. Great for city commuting.',
    category: 'Vehicles',
    estimated_value: 1200,
    desired_trade: 'Car or scooter',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Electric Scooter',
    description: 'Xiaomi electric scooter, foldable, 25km/h max speed, 30km range. Barely used.',
    category: 'Vehicles',
    estimated_value: 300,
    desired_trade: 'Bicycle or cash',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Car Tires Set of 4',
    description: 'Michelin Pilot Sport 4 tires, 225/45R17, 70% tread life remaining. Perfect condition.',
    category: 'Vehicles',
    estimated_value: 200,
    desired_trade: 'Car accessories or tools',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Bicycle Helmet',
    description: 'Giro bicycle helmet, size medium, MIPS protection system. Used but in great condition.',
    category: 'Vehicles',
    estimated_value: 50,
    desired_trade: 'Bike accessories or water bottle',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    status: 'available'
  },

  // Phones (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'iPhone 12 Pro 256GB',
    description: 'iPhone 12 Pro in excellent condition, Pacific Blue, 256GB storage. Comes with original box and accessories.',
    category: 'Phones',
    estimated_value: 600,
    desired_trade: 'iPhone 13 or newer model',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Samsung Galaxy S21',
    description: 'Samsung Galaxy S21 Ultra, 128GB, Phantom Black. Excellent camera, perfect condition.',
    category: 'Phones',
    estimated_value: 500,
    desired_trade: 'iPhone or Android tablet',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Phone Screen Protectors',
    description: 'Pack of 3 tempered glass screen protectors for iPhone 12/13. Anti-scratch and bubble-free installation.',
    category: 'Phones',
    estimated_value: 15,
    desired_trade: 'Phone case or charger',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Wireless Earbuds',
    description: 'Apple AirPods Pro with wireless charging case. Active noise cancellation, spatial audio.',
    category: 'Phones',
    estimated_value: 180,
    desired_trade: 'Phone or cash',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Phone Charging Cable',
    description: 'USB-C to Lightning cable, MFi certified, 6ft long. Fast charging compatible.',
    category: 'Phones',
    estimated_value: 20,
    desired_trade: 'Any phone accessory',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    status: 'available'
  },

  // Computers (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'MacBook Pro 13-inch M1',
    description: 'Apple MacBook Pro 13-inch with M1 chip, 8GB RAM, 256GB SSD. Perfect for development and creative work.',
    category: 'Computers',
    estimated_value: 900,
    desired_trade: 'iPad Pro or cash',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Gaming Mouse RGB',
    description: 'Logitech G305 wireless gaming mouse, RGB lighting, 12,000 DPI. Lightweight and responsive.',
    category: 'Computers',
    estimated_value: 40,
    desired_trade: 'Keyboard or mouse pad',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'External Hard Drive 1TB',
    description: 'Seagate 1TB external hard drive, USB 3.0, portable. Perfect for backups and extra storage.',
    category: 'Computers',
    estimated_value: 60,
    desired_trade: 'SSD or flash drives',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Wireless Keyboard',
    description: 'Apple Magic Keyboard, wireless, rechargeable. Perfect companion for MacBooks and iMacs.',
    category: 'Computers',
    estimated_value: 70,
    desired_trade: 'Mouse or trackpad',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'USB Flash Drive 64GB',
    description: 'SanDisk 64GB USB 3.0 flash drive, metal casing, fast transfer speeds.',
    category: 'Computers',
    estimated_value: 15,
    desired_trade: 'Small electronics or cables',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1544378730-6f3c834d9b2a?w=400',
    status: 'available'
  },

  // Gaming (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'PlayStation 5 Console',
    description: 'Sony PlayStation 5 with 825GB SSD, DualSense controller included. Excellent condition.',
    category: 'Gaming',
    estimated_value: 500,
    desired_trade: 'Xbox Series X or cash',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Nintendo Switch OLED',
    description: 'Nintendo Switch OLED model, white, with protective case. Includes 2 Joy-Con controllers.',
    category: 'Gaming',
    estimated_value: 350,
    desired_trade: 'Games or accessories',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Gaming Headset RGB',
    description: 'SteelSeries Arctis 5 RGB gaming headset, surround sound, noise-canceling mic.',
    category: 'Gaming',
    estimated_value: 100,
    desired_trade: 'Mouse or keyboard',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Xbox Controller Wireless',
    description: 'Microsoft Xbox Wireless Controller, white, Bluetooth compatible. Works with PC and Xbox.',
    category: 'Gaming',
    estimated_value: 50,
    desired_trade: 'PS4 controller or games',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Gaming Mouse Pad XXL',
    description: 'SteelSeries QcK XXL gaming mouse pad, cloth surface, optimized for gaming sensors.',
    category: 'Gaming',
    estimated_value: 25,
    desired_trade: 'Small gaming accessories',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
    status: 'available'
  },

  // Home (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Coffee Maker Automatic',
    description: 'Breville automatic coffee maker, programmable, 12-cup capacity. Makes perfect coffee every time.',
    category: 'Home',
    estimated_value: 120,
    desired_trade: 'Kitchen appliances or blender',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Air Fryer 5.8 Quart',
    description: 'Instant Pot air fryer, 5.8 quart capacity, digital controls. Healthy cooking without oil.',
    category: 'Home',
    estimated_value: 80,
    desired_trade: 'Slow cooker or pressure cooker',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Robot Vacuum Cleaner',
    description: 'iRobot Roomba 675, WiFi connected, smart navigation. Keeps your home clean automatically.',
    category: 'Home',
    estimated_value: 200,
    desired_trade: 'Smart home devices',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Blender Professional',
    description: 'Vitamix professional blender, 64oz container, variable speed control. Perfect for smoothies and soups.',
    category: 'Home',
    estimated_value: 400,
    desired_trade: 'Kitchen mixer or food processor',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Electric Kettle 1.7L',
    description: 'Hamilton Beach electric kettle, 1.7L capacity, fast boiling, auto shut-off. Stainless steel.',
    category: 'Home',
    estimated_value: 30,
    desired_trade: 'Coffee maker or small appliances',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400',
    status: 'available'
  },

  // Furniture (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Office Desk Modern',
    description: 'Modern L-shaped office desk, white, 60x30 inches. Perfect for home office setup.',
    category: 'Furniture',
    estimated_value: 250,
    desired_trade: 'Office chair or bookshelves',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Ergonomic Office Chair',
    description: 'Herman Miller ergonomic office chair, adjustable height and armrests. Excellent lumbar support.',
    category: 'Furniture',
    estimated_value: 300,
    desired_trade: 'Desk or standing desk converter',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Bookshelf 5-Tier',
    description: 'Modern 5-tier bookshelf, oak finish, 30x12x72 inches. Great for organizing books and decor.',
    category: 'Furniture',
    estimated_value: 120,
    desired_trade: 'Small furniture or decor items',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Dining Table Set',
    description: '4-piece dining set: table and 4 chairs, walnut finish. Seats 4 comfortably.',
    category: 'Furniture',
    estimated_value: 400,
    desired_trade: 'Living room furniture',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Floor Lamp Modern',
    description: 'Modern arc floor lamp, adjustable height, LED compatible. Provides excellent ambient lighting.',
    category: 'Furniture',
    estimated_value: 80,
    desired_trade: 'Table lamp or lighting fixtures',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    status: 'available'
  },

  // Fashion (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Leather Jacket Black',
    description: 'Genuine leather jacket, size M, classic black. Perfect for casual and formal occasions.',
    category: 'Fashion',
    estimated_value: 150,
    desired_trade: 'Boots or accessories',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Running Shoes Nike',
    description: 'Nike Air Zoom running shoes, size 9, excellent cushioning. Barely worn, like new condition.',
    category: 'Fashion',
    estimated_value: 80,
    desired_trade: 'Sports equipment or clothing',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Designer Sunglasses',
    description: 'Ray-Ban aviator sunglasses, polarized lenses, gold frame. Classic style and UV protection.',
    category: 'Fashion',
    estimated_value: 120,
    desired_trade: 'Watch or jewelry',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Winter Coat Wool',
    description: 'Wool blend winter coat, size L, camel color. Warm and stylish for cold weather.',
    category: 'Fashion',
    estimated_value: 100,
    desired_trade: 'Jackets or sweaters',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Leather Boots',
    description: 'Brown leather boots, size 8, ankle height. Comfortable and durable for everyday wear.',
    category: 'Fashion',
    estimated_value: 90,
    desired_trade: 'Shoes or bags',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    status: 'available'
  },

  // Sports (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Tennis Racket Wilson',
    description: 'Wilson tennis racket, oversized head, perfect for beginners and intermediate players.',
    category: 'Sports',
    estimated_value: 60,
    desired_trade: 'Badminton equipment or balls',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Yoga Mat Premium',
    description: 'Manduka yoga mat, 6mm thick, non-slip surface. Perfect for all types of yoga practice.',
    category: 'Sports',
    estimated_value: 80,
    desired_trade: 'Fitness equipment or blocks',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Dumbbells Set 20lbs',
    description: 'Pair of 20lb dumbbells, adjustable, perfect for home workouts. Includes rack.',
    category: 'Sports',
    estimated_value: 40,
    desired_trade: 'Resistance bands or kettlebell',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Basketball Wilson',
    description: 'Wilson NBA basketball, size 7, indoor/outdoor use. Official size and weight.',
    category: 'Sports',
    estimated_value: 25,
    desired_trade: 'Sports balls or equipment',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Swimming Goggles',
    description: 'Speedo swimming goggles, anti-fog, UV protection. Comfortable fit for extended wear.',
    category: 'Sports',
    estimated_value: 15,
    desired_trade: 'Swim cap or water bottle',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400',
    status: 'available'
  },

  // Tools (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Cordless Drill Set',
    description: 'DeWalt cordless drill/driver kit, 20V, includes battery and charger. Perfect for DIY projects.',
    category: 'Tools',
    estimated_value: 120,
    desired_trade: 'Power tools or tool set',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Tool Box Organizer',
    description: 'Stanley tool box, 20-inch, with organizers. Holds all essential hand tools.',
    category: 'Tools',
    estimated_value: 50,
    desired_trade: 'Small tools or hardware',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Circular Saw 7-1/4',
    description: 'Makita circular saw, 7-1/4 inch, 15 amp. Great for cutting wood and plywood.',
    category: 'Tools',
    estimated_value: 80,
    desired_trade: 'Power tools or saw blades',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Hammer Set',
    description: 'Estwing hammer set, includes claw hammer and ball peen hammer. Professional quality.',
    category: 'Tools',
    estimated_value: 40,
    desired_trade: 'Screwdrivers or pliers',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Measuring Tape 25ft',
    description: 'Stanley measuring tape, 25ft, with lock and belt clip. Accurate and durable.',
    category: 'Tools',
    estimated_value: 10,
    desired_trade: 'Small tools or hardware',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
    status: 'available'
  },

  // Music (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Electric Guitar Fender',
    description: 'Fender Squier electric guitar, sunburst finish, includes amp and cable. Great for beginners.',
    category: 'Music',
    estimated_value: 200,
    desired_trade: 'Acoustic guitar or keyboard',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Bluetooth Speaker',
    description: 'JBL GO 3 portable Bluetooth speaker, waterproof, 5-hour battery. Perfect for outdoor music.',
    category: 'Music',
    estimated_value: 30,
    desired_trade: 'Headphones or phone accessories',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Digital Piano 88 Keys',
    description: 'Yamaha digital piano, 88 weighted keys, built-in speakers. Perfect for learning and practice.',
    category: 'Music',
    estimated_value: 500,
    desired_trade: 'Musical instruments or amplifier',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Guitar Amplifier',
    description: 'Fender Blues Junior IV amplifier, 15W, perfect for electric guitar practice at home.',
    category: 'Music',
    estimated_value: 150,
    desired_trade: 'Guitar pedals or cables',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Drum Sticks Pair',
    description: 'Vic Firth drum sticks, 5A, hickory wood. Perfect grip and balance for drummers.',
    category: 'Music',
    estimated_value: 15,
    desired_trade: 'Music accessories or sheet music',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    status: 'available'
  },

  // Collectibles (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Pokemon Card Collection',
    description: 'Rare Pokemon card collection, includes Charizard 1st Edition and other valuable cards.',
    category: 'Collectibles',
    estimated_value: 300,
    desired_trade: 'Other trading cards or collectibles',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1613771404721-1f92d799e6d8?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Vintage Watch Rolex',
    description: 'Vintage Rolex Submariner, stainless steel, excellent condition. Comes with papers.',
    category: 'Collectibles',
    estimated_value: 8000,
    desired_trade: 'Luxury watches or jewelry',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Star Wars Figurines',
    description: 'Set of 6 Star Wars action figures, vintage 1970s, in original packaging.',
    category: 'Collectibles',
    estimated_value: 150,
    desired_trade: 'Other toys or collectibles',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Comic Book Collection',
    description: 'Marvel comic books collection, over 50 issues, includes rare Spider-Man comics.',
    category: 'Collectibles',
    estimated_value: 200,
    desired_trade: 'DC comics or graphic novels',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Coin Collection',
    description: 'Rare coin collection, includes silver dollars and foreign currency. Some certified.',
    category: 'Collectibles',
    estimated_value: 400,
    desired_trade: 'Other collectibles or gold items',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1613771404721-1f92d799e6d8?w=400',
    status: 'available'
  },

  // Other (5 items)
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Camping Tent 4-Person',
    description: 'Coleman camping tent, 4-person capacity, waterproof, easy setup. Perfect for outdoor adventures.',
    category: 'Other',
    estimated_value: 100,
    desired_trade: 'Camping gear or sleeping bags',
    country: 'Dominican Republic',
    city: 'Santo Domingo',
    image_url: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Professional Camera',
    description: 'Canon EOS Rebel DSLR camera, 18-55mm lens included. Great for photography enthusiasts.',
    category: 'Other',
    estimated_value: 350,
    desired_trade: 'Lenses or camera accessories',
    country: 'Dominican Republic',
    city: 'Santiago',
    image_url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Board Games Collection',
    description: 'Collection of 10 popular board games: Monopoly, Scrabble, Catan, and more. All complete.',
    category: 'Other',
    estimated_value: 80,
    desired_trade: 'Video games or puzzles',
    country: 'Dominican Republic',
    city: 'Puerto Plata',
    image_url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Art Supplies Set',
    description: 'Complete art supplies set: paints, brushes, canvas, sketchbook. Perfect for artists.',
    category: 'Other',
    estimated_value: 60,
    desired_trade: 'Craft supplies or books',
    country: 'Dominican Republic',
    city: 'La Romana',
    image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    status: 'available'
  },
  {
    user_id: '00000000-0000-0000-0000-000000000000',
    title: 'Gardening Tools Set',
    description: 'Complete gardening tool set: shovel, rake, gloves, watering can. Everything for garden maintenance.',
    category: 'Other',
    estimated_value: 40,
    desired_trade: 'Plants or gardening supplies',
    country: 'Dominican Republic',
    city: 'Higuey',
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    status: 'available'
  }
]

async function seedDatabase() {
  console.log('Starting database seeding...')

  try {
    const { data, error } = await supabase
      .from('listings')
      .insert(sampleListings)
      .select()

    if (error) {
      console.error('Error seeding database:', error)
      return
    }

    console.log(`Successfully seeded ${data?.length || 0} listings`)
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

seedDatabase()