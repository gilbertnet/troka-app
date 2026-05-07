import Link from 'next/link'

export default function Footer() {

  return (

    <footer className="bg-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-12">

          {/* BRAND */}

          <div>

            <h2 className="text-4xl font-black mb-4">

              <span className="text-white">
                TRO
              </span>

              <span className="text-green-500">
                KA
              </span>

            </h2>

            <p className="text-slate-400 leading-relaxed">
              TROKA is a modern marketplace for
              trading products, services and cash
              offers with people around the world.
            </p>

          </div>

          {/* NAVIGATION */}

          <div>

            <h3 className="text-xl font-black mb-5">
              Navigation
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">

              <Link
                href="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <Link
                href="/create-listing"
                className="hover:text-white transition"
              >
                Create Listing
              </Link>

              <Link
                href="/dashboard"
                className="hover:text-white transition"
              >
                Dashboard
              </Link>

            </div>

          </div>

          {/* SUPPORT */}

          <div>

            <h3 className="text-xl font-black mb-5">
              Support
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">

              <button className="text-left hover:text-white transition">
                Terms of Service
              </button>

              <button className="text-left hover:text-white transition">
                Privacy Policy
              </button>

              <button className="text-left hover:text-white transition">
                Contact
              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-slate-500 text-sm">
            © 2026 TROKA. All rights reserved.
          </p>

          <p className="text-slate-500 text-sm">
            Built for modern trading experiences.
          </p>

        </div>

      </div>

    </footer>
  )
}