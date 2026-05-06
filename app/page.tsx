export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold mb-6">
              Smart Exchange Marketplace
            </div>

            <h1 className="text-7xl font-black leading-tight mb-8">
              Exchange what you have for what you really want.
            </h1>

            <p className="text-2xl text-slate-600 mb-10 leading-relaxed">
              Troka helps people trade products safely across the Dominican Republic.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="bg-green-500 text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition">
                Start Trading
              </button>

              <button className="bg-white border px-10 py-5 rounded-2xl font-black text-xl">
                Explore Listings
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-6 shadow-2xl border">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
              className="rounded-[30px] h-[600px] w-full object-cover"
            />
          </div>

        </div>
      </section>
    </main>
  )
}