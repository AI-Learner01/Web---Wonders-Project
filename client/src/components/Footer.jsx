import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#14201A] text-[#DCE3DD]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-extrabold text-white">AuraAvenue</p>
            <p className="mt-3 max-w-xs text-sm text-[#9BA69D]">
              Handpicked destinations and ready-made itineraries for travelers who&rsquo;d rather explore than plan.
            </p>
            <div className="mt-5 flex gap-3">
              {["IG", "X", "FB"].map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C382F] text-xs font-semibold text-[#DCE3DD] transition hover:border-[#1EA35B] hover:text-[#1EA35B]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#9BA69D]">
              <li><Link to="/destinations" className="hover:text-[#1EA35B]">Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-[#1EA35B]">Packages</Link></li>
              <li><Link to="/itinerary" className="hover:text-[#1EA35B]">Itinerary Builder</Link></li>
              <li><Link to="/about" className="hover:text-[#1EA35B]">About Us</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Support</p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#9BA69D]">
              <li><Link to="/contact" className="hover:text-[#1EA35B]">Contact Us</Link></li>
              <li><a href="#" className="hover:text-[#1EA35B]">FAQs</a></li>
              <li><a href="#" className="hover:text-[#1EA35B]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#1EA35B]">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Stay in the loop</p>
            <p className="mt-4 text-sm text-[#9BA69D]">Deals and new destinations, once or twice a month.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex overflow-hidden rounded-lg border border-[#2C382F]"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-[#6B7167] focus:outline-none"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-[#1EA35B] px-4 text-sm font-semibold text-white transition hover:bg-[#167A44]"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[#2C382F] pt-6 text-xs text-[#6B7167] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} AuraAvenue. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
}