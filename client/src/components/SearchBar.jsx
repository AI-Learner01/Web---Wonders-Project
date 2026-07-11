import { useState } from "react";
import { SearchIcon } from "./icons";

export default function SearchBar() {
  const [destinationQuery, setDestinationQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // UI only for now — wire this up once the search/results page exists.
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl shadow-black/10 sm:flex-row sm:items-center sm:gap-0"
    >
      <div className="flex-1 px-3 py-1.5 sm:border-r sm:border-[#E5E7E0]">
        <label htmlFor="hero-search" className="block text-xs font-semibold uppercase tracking-wide text-[#8A9089]">
          Where to?
        </label>
        <div className="mt-1 flex items-center gap-2">
          <SearchIcon className="h-4 w-4 text-[#8A9089] sm:hidden" />
          <input
            id="hero-search"
            type="text"
            value={destinationQuery}
            onChange={(e) => setDestinationQuery(e.target.value)}
            placeholder="Country, city, or resort"
            className="w-full border-none bg-transparent text-sm text-[#14201A] placeholder:text-[#A8ADA5] focus:outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        className="rounded-xl bg-[#1EA35B] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#167A44]"
      >
        Search
      </button>
    </form>
  );
}