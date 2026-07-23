// PackageFilter.jsx
function PackageFilter({ filters, onFilterChange }) {
  return (
    <section className="bg-white rounded-3xl shadow-xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Find Your Perfect Package
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Destination Filter */}
        <select 
          value={filters.destination}
          onChange={(e) => onFilterChange("destination", e.target.value)}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Destination</option>
          <option value="Goa">Goa</option>
          <option value="Kashmir">Kashmir</option>
          <option value="Kerala">Kerala</option>
          <option value="Bali">Bali</option>
        </select>

        {/* Budget Filter */}
        <select 
          value={filters.budget}
          onChange={(e) => onFilterChange("budget", e.target.value)}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Budget</option>
          <option value="10k-20k">₹10,000 - ₹20,000</option>
          <option value="20k-40k">₹20,000 - ₹40,000</option>
          <option value="40k+">₹40,000+</option>
        </select>

        {/* Duration Filter */}
        <select 
          value={filters.duration}
          onChange={(e) => onFilterChange("duration", e.target.value)}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Duration</option>
          <option value="1-3">1-3 Days</option>
          <option value="4-6">4-6 Days</option>
          <option value="7+">7+ Days</option>
        </select>

        {/* Category Filter */}
        <select 
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Category</option>
          <option value="Beach">Beach</option>
          <option value="Adventure">Adventure</option>
          <option value="Mountain">Mountain</option>
          <option value="Luxury">Luxury</option>
        </select>

      </div>
    </section>
  );
}

export default PackageFilter;