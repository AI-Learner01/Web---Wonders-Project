import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { PinIcon, StarIcon, ArrowIcon, CheckIcon } from "../components/icons";

/* ---------------------------------------------------------- */
/*  Data                                                       */
/* ---------------------------------------------------------- */
/*  Images are hotlinked from Unsplash (free to use under the  */
/*  Unsplash License, no attribution required). Swap these for */
/*  your own destination photos whenever you're ready — just   */
/*  replace the `image` value with your own file/URL.          */

const TRUST_POINTS = [
  { title: "Best Price Guarantee", desc: "Find it cheaper, we'll match it" },
  { title: "24/7 Travel Support", desc: "Real humans, day or night" },
  { title: "Handpicked Stays", desc: "Every property vetted by our team" },
  { title: "50,000+ Happy Travelers", desc: "And counting, every year" },
];

const DESTINATIONS = [
  {
    slug: "santorini",
    name: "Santorini",
    country: "Greece",
    rating: 4.9,
    price: 899,
    image: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    rating: 4.8,
    price: 649,
    image: "https://images.unsplash.com/photo-1557093793-d149a38a1be8?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    rating: 4.9,
    price: 1120,
    image: "https://images.unsplash.com/photo-1753517457294-2bf4694e3760?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    rating: 4.9,
    price: 990,
    image: "https://images.unsplash.com/photo-1568805746970-0bbae56ab18b?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    rating: 4.7,
    price: 1340,
    image: "https://images.unsplash.com/photo-1531743579253-fa8d52993ba5?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    rating: 4.6,
    price: 720,
    image: "https://images.unsplash.com/photo-1653323792487-6ecc6217040b?auto=format&fit=crop&w=800&q=80",
  },
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
    image: "https://images.unsplash.com/photo-1470214203634-e436a8848e23?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "grecian-island-hopper",
    name: "Grecian Island Hopper",
    tag: "Best Seller",
    days: 8,
    nights: 7,
    price: 2150,
    blurb: "Caldera sunsets in Santorini, then the whitewashed lanes and beach clubs of Mykonos.",
    image: "https://images.unsplash.com/photo-1678188453562-a4dcc0560b46?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "peru-andes-trek",
    name: "Peru Andes Trek",
    tag: "Adventure",
    days: 7,
    nights: 6,
    price: 1650,
    blurb: "Sacred Valley villages, two days on the Inca Trail, and sunrise over Machu Picchu.",
    image: "https://images.unsplash.com/photo-1568805746970-0bbae56ab18b?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "japan-cultural-trail",
    name: "Japan Cultural Trail",
    tag: "Culture",
    days: 9,
    nights: 8,
    price: 2400,
    blurb: "Tokyo's neon crossings, Kyoto's temple gardens, and Osaka's late-night street food.",
    image: "https://images.unsplash.com/photo-1753517457294-2bf4694e3760?auto=format&fit=crop&w=800&q=80",
  },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1470214203634-e436a8848e23?auto=format&fit=crop&w=1600&q=80";

/* ---------------------------------------------------------- */
/*  Page                                                        */
/* ---------------------------------------------------------- */

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#14201A]">
      <Navbar />

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Overwater bungalows above a turquoise lagoon"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14201A]/70 via-[#14201A]/10 to-[#14201A]/30" />

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

          <div className="mt-8">
            <SearchBar />
          </div>
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
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.slug}
              to={`/destinations/${dest.slug}`}
              className="group overflow-hidden rounded-2xl border border-[#E5E7E0] bg-white transition-shadow hover:shadow-lg"
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={dest.image}
                  alt={`${dest.name}, ${dest.country}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
                />
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
            {PACKAGES.map((pkg) => (
              <Link
                key={pkg.slug}
                to={`/packages/${pkg.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7E0] bg-white transition-shadow hover:shadow-lg sm:flex-row"
              >
                <div className="h-40 w-full flex-shrink-0 overflow-hidden sm:h-auto sm:w-44">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
                  />
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

      <Footer />
    </div>
  );
}