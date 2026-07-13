function PackageFilter() {
  return (
    <section className="bg-white rounded-3xl shadow-x1 p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Find Your Perfect Package
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <select className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500">
          <option>Destination</option>
          <option>Goa</option>
          <option>Kashmir</option>
          <option>Kerala</option>
          <option>Bali</option>
        </select>

        <select className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500">
          <option>Budget</option>
          <option>₹10,000 - ₹20,000</option>
          <option>₹20,000 - ₹40,000</option>
          <option>₹40,000+</option>
        </select>

        <select className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500">
          <option>Duration</option>
          <option>1-3 Days</option>
          <option>4-6 Days</option>
          <option>7+ Days</option>
        </select>

        <select className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500">
          <option>Category</option>
          <option>Beach</option>
          <option>Adventure</option>
          <option>Mountain</option>
          <option>Luxury</option>
        </select>

      </div>
    </section>
  );
}

export default PackageFilter;