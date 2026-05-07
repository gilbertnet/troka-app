'use client'
    setTitle('')
    setDescription('')
    setCategory('')
    setDesiredTrade('')
    setEstimatedValue('')
    setCity('')
    setCountry('Dominican Republic')
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[40px] shadow-xl border">

        <div className="mb-10">
          <h1 className="text-5xl font-black mb-3">
            Create Listing
          </h1>

          <p className="text-slate-500 text-lg">
            Publish an item for trade on Troka.
          </p>
        </div>

        <div className="space-y-6">

          <div>
            <label className="font-bold block mb-2">
              Listing Title
            </label>

            <input
              type="text"
              placeholder="Example: iPhone 14 Pro Max"
              className="w-full border rounded-2xl px-5 py-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="font-bold block mb-2">
              Category
            </label>

            <select
              className="w-full border rounded-2xl px-5 py-4 bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-bold block mb-2">
              Description
            </label>

            <textarea
              placeholder="Describe your item condition and details"
              className="w-full border rounded-2xl px-5 py-4 min-h-[160px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="font-bold block mb-2">
              What would you like in exchange?
            </label>

            <input
              type="text"
              placeholder="Example: Laptop, motorcycle, cash + phone"
              className="w-full border rounded-2xl px-5 py-4"
              value={desiredTrade}
              onChange={(e) => setDesiredTrade(e.target.value)}
            />
          </div>

          <div>
            <label className="font-bold block mb-2">
              Estimated Value (USD)
}