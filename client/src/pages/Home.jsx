import { useState } from "react";
import { Link } from "react-router-dom";


const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "Itinerary", to: "/itinerary" },
  { label: "Packages", to: "/packages" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const TRUST_POINTS = [
  { title: "Best Price Guarantee", desc: "Find it cheaper, we'll match it" },
  { title: "24/7 Travel Support", desc: "Real humans, day or night" },
  { title: "Handpicked Stays", desc: "Every property vetted by our team" },
  { title: "50,000+ Happy Travelers", desc: "And counting, every year" },
];

const DESTINATIONS = [
  { slug: "santorini", name: "Santorini", country: "Greece", rating: 4.9, price: 899, variant: "dome" },
  { slug: "bali", name: "Bali", country: "Indonesia", rating: 4.8, price: 649, variant: "gate" },
  { slug: "kyoto", name: "Kyoto", country: "Japan", rating: 4.9, price: 1120, variant: "torii" },
  { slug: "machu-picchu", name: "Machu Picchu", country: "Peru", rating: 4.9, price: 990, variant: "terrace" },
  { slug: "swiss-alps", name: "Swiss Alps", country: "Switzerland", rating: 4.7, price: 1340, variant: "peak" },
  { slug: "marrakech", name: "Marrakech", country: "Morocco", rating: 4.6, price: 720, variant: "arch" },
];

const PACKAGES = [
  {
    slug: "maldives-overwater-escape",
    name: "Maldives Overwater Escape",
    tag: "Honeymoon Pick",
    days: 6,
    nights: 5,
    price: 1899,
    blurb: "A private overwater villa, a sunset dolphin cruise, and dinner on a sandbank that disappears at high tide.",
    variant: "ocean",
  },
  {
    slug: "grecian-island-hopper",
    name: "Grecian Island Hopper",
    tag: "Best Seller",
    days: 8,
    nights: 7,
    price: 2150,
    blurb: "Caldera sunsets in Santorini, then the whitewashed lanes and beach clubs of Mykonos.",
    variant: "aegean",
  },
  {
    slug: "peru-andes-trek",
    name: "Peru Andes Trek",
    tag: "Adventure",
    days: 7,
    nights: 6,
    price: 1650,
    blurb: "Sacred Valley villages, two days on the Inca Trail, and sunrise over Machu Picchu.",
    variant: "andes",
  },
  {
    slug: "japan-cultural-trail",
    name: "Japan Cultural Trail",
    tag: "Culture",
    days: 9,
    nights: 8,
    price: 2400,
    blurb: "Tokyo's neon crossings, Kyoto's temple gardens, and Osaka's late-night street food.",
    variant: "japan",
  },
];


const PinIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 21s-6.75-6.19-6.75-11.25a6.75 6.75 0 0 1 13.5 0C18.75 14.81 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="9.75" r="2.25" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const StarIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.5l2.9 6.06 6.6.79-4.86 4.6 1.28 6.55L12 17.77l-5.92 3.23 1.28-6.55-4.86-4.6 6.6-.79L12 2.5Z" />
  </svg>
);

const MenuIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 12.5l2.5 2.5 5.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


function PostcardScene({ variant, uid }) {
  const skyId = `sky-${uid}`;
  const seaId = `sea-${uid}`;

  const scenes = {
    dome: (
      <>
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EAF6FA" />
            <stop offset="100%" stopColor="#BFE3F0" />
          </linearGradient>
          <linearGradient id={seaId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6FE3D6" />
            <stop offset="100%" stopColor="#0E6E68" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${skyId})`} />
        <path d="M0 165 L400 165 L400 240 L0 240 Z" fill={`url(#${seaId})`} />
        <path d="M0 168 Q40 158 90 168 T190 168 T290 168 T400 168 L400 240 L0 240 Z" fill="#F5F4EF" />
        <rect x="70" y="112" width="60" height="56" rx="4" fill="#FFFFFF" />
        <rect x="150" y="128" width="52" height="40" rx="4" fill="#FFFFFF" />
        <rect x="220" y="105" width="66" height="63" rx="4" fill="#FFFFFF" />
        <circle cx="100" cy="104" r="18" fill="#1E5FA8" />
        <circle cx="253" cy="98" r="20" fill="#1E5FA8" />
        <rect x="94" y="130" width="12" height="18" rx="2" fill="#BFE3F0" />
        <rect x="245" y="128" width="14" height="20" rx="2" fill="#BFE3F0" />
      </>
    ),
    gate: (
      <>
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDEBD3" />
            <stop offset="100%" stopColor="#F7C59F" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${skyId})`} />
        <path d="M0 175 Q200 150 400 178 L400 240 L0 240 Z" fill="#3F7A4C" />
        <path d="M140 60 L165 60 L155 190 L120 190 Z" fill="#6B4A31" />
        <path d="M260 60 L235 60 L245 190 L280 190 Z" fill="#6B4A31" />
        <path d="M132 60 L173 60 L165 82 L140 82 Z" fill="#8B5E34" />
        <path d="M268 60 L227 60 L235 82 L260 82 Z" fill="#8B5E34" />
        <ellipse cx="70" cy="185" rx="10" ry="28" fill="#1EA35B" />
        <ellipse cx="330" cy="190" rx="12" ry="32" fill="#146B3A" />
      </>
    ),
    torii: (
      <>
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBD8E3" />
            <stop offset="100%" stopColor="#FDEBD3" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${skyId})`} />
        <path d="M0 185 Q200 165 400 188 L400 240 L0 240 Z" fill="#EAF6FA" />
        <path d="M255 90 L255 200 L245 200 L245 90 Z" fill="#4A3B2A" />
        <path d="M255 90 L275 40 L295 90 L275 130 Z" fill="#4A3B2A" />
        <path d="M255 108 L295 108 L295 118 L255 118 Z" fill="#4A3B2A" />
        <rect x="70" y="150" width="12" height="60" fill="#C1440E" />
        <rect x="150" y="150" width="12" height="60" fill="#C1440E" />
        <rect x="55" y="118" width="122" height="14" rx="3" fill="#C1440E" />
        <rect x="65" y="140" width="102" height="9" rx="2" fill="#C1440E" />
        <circle cx="40" cy="70" r="4" fill="#F2A0BE" />
        <circle cx="60" cy="55" r="3" fill="#F2A0BE" />
        <circle cx="30" cy="90" r="3" fill="#F2A0BE" />
      </>
    ),
    terrace: (
      <>
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5F4EF" />
            <stop offset="100%" stopColor="#DCEFE3" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${skyId})`} />
        <path d="M0 160 L130 60 L200 110 L260 40 L400 140 L400 240 L0 240 Z" fill="#2F5D3A" />
        <path d="M0 190 L150 110 L230 150 L300 95 L400 170 L400 240 L0 240 Z" fill="#3F7A4C" />
        <path d="M0 215 L170 150 L260 185 L400 200 L400 240 L0 240 Z" fill="#58A66B" />
        <rect x="230" y="55" width="14" height="10" fill="#F2E1C1" />
        <rect x="250" y="60" width="12" height="9" fill="#F2E1C1" />
        <g stroke="#245331" strokeWidth="1.2" opacity="0.5">
          <path d="M20 205 h120" />
          <path d="M60 220 h150" />
        </g>
      </>
    ),
    peak: (
      <>
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CFE8F5" />
            <stop offset="100%" stopColor="#EAF6FA" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${skyId})`} />
        <path d="M0 190 L110 70 L170 150 L230 55 L310 160 L400 110 L400 240 L0 240 Z" fill="#5B7C99" />
        <path d="M100 84 L110 70 L120 84 Z" fill="#FFFFFF" />
        <path d="M215 72 L230 55 L245 76 Z" fill="#FFFFFF" />
        <path d="M0 220 L60 195 L90 220 Z" fill="#1EA35B" />
        <path d="M50 225 L100 195 L140 225 Z" fill="#146B3A" />
        <path d="M300 225 L340 200 L380 225 Z" fill="#1EA35B" />
      </>
    ),
    arch: (
      <>
        <defs>
          <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCE7CF" />
            <stop offset="100%" stopColor="#F7C59F" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#${skyId})`} />
        <path d="M0 200 L400 200 L400 240 L0 240 Z" fill="#E7B98A" />
        <rect x="300" y="70" width="26" height="130" fill="#C1682F" />
        <path d="M300 70 Q313 40 326 70 Z" fill="#C1682F" />
        <path
          d="M140 200 L140 120 Q140 70 200 70 Q260 70 260 120 L260 200 Z"
          fill="#C1682F"
        />
        <path
          d="M160 200 L160 122 Q160 88 200 88 Q240 88 240 122 L240 200 Z"
          fill="#F2E1C1"
        />
        <circle cx="90" cy="150" r="4" fill="#C1682F" opacity="0.5" />
        <circle cx="90" cy="170" r="4" fill="#C1682F" opacity="0.5" />
        <circle cx="106" cy="160" r="4" fill="#C1682F" opacity="0.5" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      {scenes[variant]}
    </svg>
  );
}

function PackageArt({ variant, uid }) {
  const gradId = `pkg-${uid}`;
  const palettes = {
    ocean: ["#6FE3D6", "#0E6E68"],
    aegean: ["#BFE3F0", "#1E5FA8"],
    andes: ["#DCEFE3", "#2F5D3A"],
    japan: ["#FBD8E3", "#C1440E"],
  };
  const [from, to] = palettes[variant] || palettes.ocean;

  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill={`url(#${gradId})`} />
      <circle cx="340" cy="40" r="70" fill="#FFFFFF" opacity="0.08" />
      <circle cx="40" cy="190" r="90" fill="#FFFFFF" opacity="0.08" />
    </svg>
  );
}


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [destinationQuery, setDestinationQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <div className="min-h-screen bg-white text-[#14201A]">
      {/* ---------- Navbar ---------- */}
      <header className="sticky top-0 z-50 bg-[#F5F4EF]/95 backdrop-blur border-b border-[#E5E7E0]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="text-xl font-extrabold tracking-tight">
            AuraAvenue
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-[#1EA35B] ${
                  link.label === "Home" ? "text-[#1EA35B]" : "text-[#3B443E]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-full bg-[#1EA35B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#167A44] md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            Menu
          </button>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-[#E5E7E0] bg-[#F5F4EF] px-6 py-3 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  link.label === "Home" ? "bg-white text-[#1EA35B]" : "text-[#3B443E] hover:bg-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <svg
          viewBox="0 0 1200 640"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDF6EC" />
              <stop offset="55%" stopColor="#BFE3F0" />
              <stop offset="100%" stopColor="#6FE3D6" />
            </linearGradient>
            <linearGradient id="hero-sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4FD3C4" />
              <stop offset="100%" stopColor="#0B5F5A" />
            </linearGradient>
          </defs>
          <rect width="1200" height="640" fill="url(#hero-sky)" />
          <circle cx="980" cy="140" r="90" fill="#FFF6E0" opacity="0.85" />
          <ellipse cx="230" cy="190" rx="120" ry="26" fill="#FFFFFF" opacity="0.55" />
          <ellipse cx="330" cy="220" rx="150" ry="30" fill="#FFFFFF" opacity="0.45" />
          <path d="M0 380 L1200 380 L1200 640 L0 640 Z" fill="url(#hero-sea)" />
          <path d="M0 385 Q600 355 1200 388 L1200 640 L0 640 Z" fill="#1EBFAE" opacity="0.35" />

    
          <ellipse cx="140" cy="392" rx="90" ry="20" fill="#E8D9AF" />
          <path d="M110 392 Q118 330 90 300" stroke="#146B3A" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M150 392 Q158 320 190 296" stroke="#146B3A" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M90 300 Q60 292 45 305 M90 300 Q70 275 78 258 M90 300 Q112 280 128 270" stroke="#1EA35B" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M190 296 Q160 288 145 300 M190 296 Q170 270 178 252 M190 296 Q212 276 228 266" stroke="#1EA35B" strokeWidth="5" fill="none" strokeLinecap="round" />

         
          <path d="M330 400 L1120 388" stroke="#C9A876" strokeWidth="10" strokeLinecap="round" />
          {[430, 560, 690, 820, 950].map((x, i) => (
            <g key={x}>
              <rect x={x - 55} y={352 - (i % 2) * 8} width="110" height="52" rx="4" fill="#FFFFFF" />
              <path d={`M${x - 62} ${352 - (i % 2) * 8} L${x} ${312 - (i % 2) * 8} L${x + 62} ${352 - (i % 2) * 8} Z`} fill="#8B5E34" />
              <rect x={x - 10} y={368 - (i % 2) * 8} width="20" height="22" fill="#BFE3F0" />
            </g>
          ))}
          <path d="M300 640 Q600 600 900 640 L1200 640 L1200 700 L0 700 Z" fill="#0B5F5A" opacity="0.4" />
        </svg>

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10 lg:pt-24">
          <span className="inline-block rounded-full bg-[#14201A]/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
            Plan Your Next Escape
          </span>

          <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            Explore the World&rsquo;s
            <br />
            <span className="text-[#1EA35B]">Hidden Gems</span>
          </h1>

          <p className="mt-6 max-w-xl rounded-2xl bg-[#14201A]/55 px-5 py-4 text-base text-white sm:text-lg">
            Discover breathtaking destinations, curated local experiences, and exclusive travel deals tailored just
            for you.
          </p>

          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl shadow-black/10 sm:flex-row sm:items-center sm:gap-0"
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
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section className="border-b border-[#E5E7E0] bg-[#F5F4EF]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 lg:grid-cols-4 lg:px-10">
          {TRUST_POINTS.map((point) => (
            <div key={point.title} className="flex items-start gap-3">
              <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1EA35B]" />
              <div>
                <p className="text-sm font-semibold text-[#14201A]">{point.title}</p>
                <p className="text-xs text-[#6B7167]">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Popular destinations ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#1EA35B]">Popular destinations</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#14201A] sm:text-4xl">
              Where travelers are heading this season
            </h2>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1EA35B] hover:text-[#167A44]"
          >
            View all destinations
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((dest, i) => (
            <Link
              key={dest.slug}
              to={`/destinations/${dest.slug}`}
              className="group overflow-hidden rounded-2xl border border-[#E5E7E0] bg-white transition-shadow hover:shadow-lg"
            >
              <div className="h-44 w-full overflow-hidden">
                <div className="h-full w-full transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105">
                  <PostcardScene variant={dest.variant} uid={`dest-${i}`} />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#6B7167]">
                    <PinIcon className="h-3.5 w-3.5" />
                    {dest.country}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#14201A]">
                    <StarIcon className="h-3.5 w-3.5 text-[#F2A93B]" />
                    {dest.rating}
                  </div>
                </div>
                <h3 className="mt-2 text-lg font-bold text-[#14201A]">{dest.name}</h3>
                <p className="mt-1 text-sm text-[#6B7167]">
                  From <span className="font-semibold text-[#14201A]">${dest.price}</span> / person
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Featured packages ---------- */}
      <section className="bg-[#F5F4EF] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#1EA35B]">Featured packages</span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#14201A] sm:text-4xl">
                Trips we&rsquo;ve already planned for you
              </h2>
            </div>
            <Link
              to="/packages"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1EA35B] hover:text-[#167A44]"
            >
              View all packages
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {PACKAGES.map((pkg, i) => (
              <Link
                key={pkg.slug}
                to={`/packages/${pkg.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7E0] bg-white transition-shadow hover:shadow-lg sm:flex-row"
              >
                <div className="h-40 w-full flex-shrink-0 overflow-hidden sm:h-auto sm:w-44">
                  <div className="h-full w-full transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105">
                    <PackageArt variant={pkg.variant} uid={`pkg-${i}`} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="inline-block w-fit rounded-full bg-[#1EA35B]/10 px-3 py-1 text-xs font-semibold text-[#167A44]">
                    {pkg.tag}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#14201A]">{pkg.name}</h3>
                  <p className="mt-1.5 text-sm text-[#6B7167]">{pkg.blurb}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#8A9089]">
                      {pkg.days} days / {pkg.nights} nights
                    </span>
                    <span className="text-base font-bold text-[#14201A]">
                      ${pkg.price}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
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
            <p>Built for Web Wonders 2026 &mdash; Travel &amp; Tourism</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
