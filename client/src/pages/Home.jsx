import { Component, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import {
  PinIcon,
  StarIcon,
  ArrowIcon,
  CheckIcon,
  CalendarIcon,
  MapIcon,
  GridIcon,
  HeartIcon,
} from "../components/icons";


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("AuraAvenue UI error:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-lg font-bold text-[#14201A]">Something went wrong.</p>
          <p className="max-w-sm text-sm text-[#6B7167]">
            We hit a snag loading this page. Try refreshing — if it keeps happening, let us know.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="rounded-full bg-[#167A44] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#125E36]"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}


function SmartImage({ src, alt, className = "", fallbackLabel, priority = false }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#1EA35B]/15 to-[#0E6E68]/25 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="px-4 text-xs font-semibold text-[#167A44]">
          {fallbackLabel || alt || "Image unavailable"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      onError={() => setErrored(true)}
      className={className}
    />
  );
}

// WMO weather codes → a simple emoji, so the badge doesn't need an icon set.


function weatherEmoji(code) {
  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 57) return "🌦️";
  if (code >= 61 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "🌨️";
  if (code >= 80 && code <= 82) return "🌧️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95) return "⛈️";
  return "🌡️";
}

/**
 * data (no key required) from Open-Meteo's forecast API — see the
 * useEffect in Home() below for the actual fetch.
 */
function WeatherBadge({ entry }) {
  if (!entry || entry.status === "loading") {
    return (
      <span
        aria-hidden="true"
        className="absolute right-3 top-3 h-6 w-16 animate-pulse rounded-full bg-white/70 backdrop-blur"
      />
    );
  }
  if (entry.status === "error") return null;
  return (
    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#14201A] shadow-sm backdrop-blur">
      <span aria-hidden="true">{weatherEmoji(entry.code)}</span>
      {entry.temp}°C
    </span>
  );
}


function DestinationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7E0] bg-white" aria-hidden="true">
      <div className="h-44 w-full animate-pulse bg-[#E5E7E0]" />
      <div className="space-y-2.5 p-5">
        <div className="h-3 w-1/3 animate-pulse rounded bg-[#E5E7E0]" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#E5E7E0]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[#E5E7E0]" />
      </div>
    </div>
  );
}

function PackageCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#E5E7E0] bg-white sm:flex-row" aria-hidden="true">
      <div className="h-40 w-full flex-shrink-0 animate-pulse bg-[#E5E7E0] sm:h-auto sm:w-44" />
      <div className="flex-1 space-y-2.5 p-5">
        <div className="h-4 w-1/4 animate-pulse rounded-full bg-[#E5E7E0]" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-[#E5E7E0]" />
        <div className="h-3 w-full animate-pulse rounded bg-[#E5E7E0]" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-[#E5E7E0]" />
      </div>
    </div>
  );
}

// Persists which destinations a visitor has "liked" so the Recommended
// section has real signal to work with 

const SAVED_KEY = "auraavenue:savedDestinations";

function getInitialSaved() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}


function DestinationCard({ dest, weatherEntry, isSaved, onToggleSave, compact = false }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-[#E5E7E0] bg-white transition-shadow hover:shadow-lg ${
        compact ? "w-72 flex-shrink-0 snap-start" : "w-full"
      }`}
    >
      <Link to={`/destinations/${dest.slug}`} className="block">
        <div className="relative h-44 w-full overflow-hidden">
          <SmartImage
            src={dest.image}
            alt={`${dest.name}, ${dest.country}`}
            fallbackLabel={dest.name}
            className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
          />
          <WeatherBadge entry={weatherEntry} />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#6B7167]">
              <PinIcon className="h-3.5 w-3.5" />
              {dest.country}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#14201A]">
              <StarIcon className="h-3.5 w-3.5 text-[#F2A93B] transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:rotate-12 group-hover:scale-110" />
              {dest.rating}
            </div>
          </div>
          <h3 className="mt-2 text-lg font-bold text-[#14201A] transition-colors duration-300 motion-reduce:transition-none group-hover:text-[#167A44]">
            {dest.name}
          </h3>
          <p className="mt-1 text-sm text-[#6B7167]">
            From <span className="font-semibold text-[#14201A]">${dest.price}</span> / person
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#8A9089]">
            <CalendarIcon className="h-3.5 w-3.5" />
            Best time to visit: {dest.bestTime}
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onToggleSave(dest.slug)}
        aria-pressed={isSaved}
        aria-label={isSaved ? `Remove ${dest.name} from saved destinations` : `Save ${dest.name}`}
        className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167A44] focus-visible:ring-offset-1"
      >
        <HeartIcon filled={isSaved} className={`h-4 w-4 ${isSaved ? "text-[#E11D48]" : "text-[#3B443E]"}`} />
      </button>
    </div>
  );
}

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
    latitude: 36.3932,
    longitude: 25.4615,
    name: "Santorini",
    country: "Greece",
    tags: ["beach", "heritage"],
    rating: 4.9,
    price: 899,
    bestTime: "Apr – Oct",
    image:
      "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "bali",
    latitude: -8.6705,
    longitude: 115.2126,
    name: "Bali",
    country: "Indonesia",
    tags: ["beach", "adventure"],
    rating: 4.8,
    price: 649,
    bestTime: "May – Sep",
    image:
      "https://images.unsplash.com/photo-1557093793-d149a38a1be8?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "kyoto",
    latitude: 35.0116,
    longitude: 135.7681,
    name: "Kyoto",
    country: "Japan",
    tags: ["heritage", "culture"],
    rating: 4.9,
    price: 1120,
    bestTime: "Mar – May",
    image:
      "https://images.unsplash.com/photo-1753517457294-2bf4694e3760?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "machu-picchu",
    latitude: -13.1631,
    longitude: -72.545,
    name: "Machu Picchu",
    country: "Peru",
    tags: ["adventure", "heritage"],
    rating: 4.9,
    price: 990,
    bestTime: "May – Sep",
    image:
      "https://images.unsplash.com/photo-1568805746970-0bbae56ab18b?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "swiss-alps",
    latitude: 46.0207,
    longitude: 7.7491,
    name: "Swiss Alps",
    country: "Switzerland",
    tags: ["mountains", "adventure"],
    rating: 4.7,
    price: 1340,
    bestTime: "Jun – Sep",
    image:
      "https://images.unsplash.com/photo-1531743579253-fa8d52993ba5?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "marrakech",
    latitude: 31.6295,
    longitude: -7.9811,
    name: "Marrakech",
    country: "Morocco",
    tags: ["heritage", "culture"],
    rating: 4.6,
    price: 720,
    bestTime: "Mar – May",
    image:
      "https://images.unsplash.com/photo-1653323792487-6ecc6217040b?auto=format&fit=crop&w=800&q=80",
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
    blurb:
      "A private overwater villa, a sunset dolphin cruise, and dinner on a sandbank that disappears at high tide.",
    image:
      "https://images.unsplash.com/photo-1470214203634-e436a8848e23?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "grecian-island-hopper",
    name: "Grecian Island Hopper",
    tag: "Best Seller",
    days: 8,
    nights: 7,
    price: 2150,
    blurb:
      "Caldera sunsets in Santorini, then the whitewashed lanes and beach clubs of Mykonos.",
    image:
      "https://images.unsplash.com/photo-1678188453562-a4dcc0560b46?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "peru-andes-trek",
    name: "Peru Andes Trek",
    tag: "Adventure",
    days: 7,
    nights: 6,
    price: 1650,
    blurb:
      "Sacred Valley villages, two days on the Inca Trail, and sunrise over Machu Picchu.",
    image:
      "https://images.unsplash.com/photo-1568805746970-0bbae56ab18b?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "japan-cultural-trail",
    name: "Japan Cultural Trail",
    tag: "Culture",
    days: 9,
    nights: 8,
    price: 2400,
    blurb:
      "Tokyo's neon crossings, Kyoto's temple gardens, and Osaka's late-night street food.",
    image:
      "https://images.unsplash.com/photo-1753517457294-2bf4694e3760?auto=format&fit=crop&w=800&q=80",
  },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1470214203634-e436a8848e23?auto=format&fit=crop&w=1600&q=80";

// Live weather per destination — free, no API key, CORS-enabled:
// https://open-meteo.com/en/docs
const WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";

export default function Home() {
  const [weather, setWeather] = useState({});
  const [contentReady, setContentReady] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [savedSlugs, setSavedSlugs] = useState(getInitialSaved);
  const recommendedScrollerRef = useRef(null);


  // can throw in private browsing / storage-disabled contexts — a failed
  // save just means it won't persist, not a broken page.
  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedSlugs));
    } catch {
   
    }
  }, [savedSlugs]);

  const toggleSaved = (slug) => {
    setSavedSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  // Handbook: "Recommendations — suggest destinations based on what the
  // user has liked or saved previously.
  
  const recommendations = useMemo(() => {
    const liked = DESTINATIONS.filter((d) => savedSlugs.includes(d.slug));

    if (liked.length === 0) {
      return {
        basedOn: null,
        items: [...DESTINATIONS].sort((a, b) => b.rating - a.rating).slice(0, 4),
      };
    }

    const likedTags = new Set(liked.flatMap((d) => d.tags));
    const unliked = DESTINATIONS.filter((d) => !savedSlugs.includes(d.slug));
    const scored = unliked
      .map((d) => ({ dest: d, score: d.tags.filter((t) => likedTags.has(t)).length }))
      .sort((a, b) => b.score - a.score || b.dest.rating - a.dest.rating);

    const withOverlap = scored.filter((s) => s.score > 0).map((s) => s.dest);
    const items = (withOverlap.length > 0 ? withOverlap : scored.map((s) => s.dest)).slice(0, 4);

    return { basedOn: liked[liked.length - 1].name, items };
  }, [savedSlugs]);

  const scrollRecommended = (direction) => {
    const el = recommendedScrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.9, 600), behavior: "smooth" });
  };

  // Simulates the initial fetch you'd get from a real listings/backend API
  // — this is what the skeleton cards below are standing in for. Swap this
  // timer for a real loading state once that API exists.

  useEffect(() => {
    const timer = window.setTimeout(() => setContentReady(true), 700);
    return () => window.clearTimeout(timer);
  }, []);


  useEffect(() => {
    const controllers = DESTINATIONS.map(() => new AbortController());

    DESTINATIONS.forEach((dest, i) => {
      setWeather((prev) => ({ ...prev, [dest.slug]: { status: "loading" } }));

      const url = `${WEATHER_ENDPOINT}?latitude=${dest.latitude}&longitude=${dest.longitude}&current_weather=true`;
      fetch(url, { signal: controllers[i].signal })
        .then((res) => {
          if (!res.ok) throw new Error(`Request failed with ${res.status}`);
          return res.json();
        })
        .then((data) => {
          const cw = data.current_weather;
          setWeather((prev) => ({
            ...prev,
            [dest.slug]: { status: "success", temp: Math.round(cw.temperature), code: cw.weathercode },
          }));
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error(`Weather fetch failed for ${dest.name}:`, err);
            setWeather((prev) => ({ ...prev, [dest.slug]: { status: "error" } }));
          }
        });
    });

    return () => controllers.forEach((c) => c.abort());
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-[#14201A]">
        <Navbar />

        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden">
          {/* Scoped keyframes for this page only — no new files, no config changes */}
          <style>{`
            @keyframes auraKenBurns {
              0%   { transform: scale(1); }
              100% { transform: scale(1.09); }
            }
            @keyframes auraFloat {
              0%, 100% { transform: translateY(0); }
              50%      { transform: translateY(-10px); }
            }
            @keyframes auraFloatSlow {
              0%, 100% { transform: translateY(0); }
              50%      { transform: translateY(8px); }
            }
            .aura-kenburns { animation: auraKenBurns 20s ease-in-out infinite alternate; }
            .aura-float { animation: auraFloat 5s ease-in-out infinite; }
            .aura-float-slow { animation: auraFloatSlow 6.5s ease-in-out infinite; }
            @media (prefers-reduced-motion: reduce) {
              .aura-kenburns, .aura-float, .aura-float-slow { animation: none; }
            }
          `}</style>

          <SmartImage
            src={HERO_IMAGE}
            alt="Overwater bungalows above a turquoise lagoon"
            priority
            fallbackLabel="AuraAvenue"
            className="aura-kenburns absolute inset-0 h-full w-full object-cover"
          />
          {/* Layered wash: dark base for text legibility + a brand-green tint for cohesion */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14201A]/75 via-[#14201A]/15 to-[#0E6E68]/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14201A]/40 via-transparent to-transparent" />

          {/* Floating credibility badges — desktop/tablet only, kept out of the way of the search card */}
          <div className="aura-float pointer-events-none absolute right-6 top-24 hidden rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-md sm:block lg:right-16">
            <div className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-[#F2A93B]" />
              <span className="text-sm font-bold text-white">4.9 / 5</span>
            </div>
            <p className="mt-0.5 text-xs text-white/80">12,400+ traveler reviews</p>
          </div>

          <div className="aura-float-slow pointer-events-none absolute bottom-28 right-6 hidden rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-md md:block lg:right-16">
            <div className="flex items-center gap-2">
              <PinIcon className="h-4 w-4 text-[#1EA35B]" />
              <span className="text-sm font-bold text-white">40+ destinations</span>
            </div>
            <p className="mt-0.5 text-xs text-white/80">across 6 continents</p>
          </div>

          <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-10 lg:pt-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
              <PinIcon className="h-3.5 w-3.5" />
              Plan Your Next Escape
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
              Explore the World&rsquo;s
              <br />
              <span className="relative inline-block text-[#3DD68C]">
                Hidden Gems
                <svg
                  viewBox="0 0 220 18"
                  className="absolute -bottom-2 left-0 h-3.5 w-full text-[#3DD68C]/70"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 12c30-10 60-10 90 0s90 10 126-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-7 max-w-xl rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-base text-white backdrop-blur-md sm:text-lg">
              Discover breathtaking destinations, curated local experiences, and
              exclusive travel deals tailored just for you.
            </p>

            <div className="mt-8">
              <SearchBar />
            </div>
          </div>

          {/* Scroll cue */}
          <div className="aura-float absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/80 sm:flex">
            <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
            <ArrowIcon className="h-4 w-4 rotate-90" />
          </div>
        </section>

        {/* ---------- Trust strip ---------- */}
        <section className="border-b border-[#E5E7E0] bg-[#F5F4EF]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 lg:grid-cols-4 lg:px-10">
            {TRUST_POINTS.map((point) => (
              <div key={point.title} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1EA35B]" />
                <div>
                  <p className="text-sm font-semibold text-[#14201A]">
                    {point.title}
                  </p>
                  <p className="text-xs text-[#6B7167]">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Recommended for you ---------- */}
        <section className="mx-auto max-w-7xl px-6 pt-16 lg:px-10 lg:pt-24">
          <style>{`
            .aura-scroll-hide::-webkit-scrollbar { display: none; }
            .aura-scroll-hide { scrollbar-width: none; -ms-overflow-style: none; }
          `}</style>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#167A44]">
                Recommended for you
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#14201A] sm:text-4xl">
                {recommendations.basedOn ? `Because you saved ${recommendations.basedOn}` : "Popular picks to get you started"}
              </h2>
              <p className="mt-1.5 text-sm text-[#6B7167]">
                {recommendations.basedOn
                  ? "More destinations that match what you've liked."
                  : "Tap the heart on any destination below to personalize this."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollRecommended(-1)}
                aria-label="Scroll recommendations left"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7E0] bg-white text-[#3B443E] transition hover:bg-[#F5F4EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167A44] focus-visible:ring-offset-1"
              >
                <ArrowIcon className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => scrollRecommended(1)}
                aria-label="Scroll recommendations right"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7E0] bg-white text-[#3B443E] transition hover:bg-[#F5F4EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167A44] focus-visible:ring-offset-1"
              >
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={recommendedScrollerRef}
            className="aura-scroll-hide mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
          >
            {!contentReady ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-72 flex-shrink-0 snap-start">
                  <DestinationCardSkeleton />
                </div>
              ))
            ) : recommendations.items.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[#E5E7E0] px-6 py-10 text-center text-sm text-[#6B7167]">
                You&rsquo;ve saved all of our destinations — nice taste! Check back as we add more.
              </p>
            ) : (
              recommendations.items.map((dest) => (
                <DestinationCard
                  key={dest.slug}
                  dest={dest}
                  weatherEntry={weather[dest.slug]}
                  isSaved={savedSlugs.includes(dest.slug)}
                  onToggleSave={toggleSaved}
                  compact
                />
              ))
            )}
          </div>
        </section>

        {/* ---------- Popular destinations ---------- */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#167A44]">
                Popular destinations
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#14201A] sm:text-4xl">
                Where travelers are heading this season
              </h2>
            </div>
            <Link
              to="/destinations"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#167A44] hover:text-[#125E36]"
            >
              View all destinations
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Explore on Map toggle — the map itself isn't built yet , but
              this is the UI hook it'll plug into. */}

          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs font-medium text-[#6B7167]">View as</span>
            <div className="inline-flex items-center gap-1 rounded-full border border-[#E5E7E0] bg-white p-1">
              <button
                type="button"
                onClick={() => setShowMap(false)}
                aria-pressed={!showMap}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167A44] focus-visible:ring-offset-1 ${
                  !showMap ? "bg-[#167A44] text-white" : "text-[#6B7167] hover:text-[#14201A]"
                }`}
              >
                <GridIcon className="h-3.5 w-3.5" />
                Grid
              </button>
              <button
                type="button"
                onClick={() => setShowMap(true)}
                aria-pressed={showMap}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167A44] focus-visible:ring-offset-1 ${
                  showMap ? "bg-[#167A44] text-white" : "text-[#6B7167] hover:text-[#14201A]"
                }`}
              >
                <MapIcon className="h-3.5 w-3.5" />
                Map
              </button>
            </div>
          </div>

          {showMap ? (
            <div className="mt-6 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-[#E5E7E0] bg-[#F5F4EF] px-6 py-16 text-center">
              <MapIcon className="h-9 w-9 text-[#167A44]" />
              <div>
                <p className="text-base font-bold text-[#14201A]">Interactive map coming soon</p>
                <p className="mx-auto mt-1.5 max-w-md text-sm text-[#6B7167]">
                  This panel is the hook for a Google Maps .
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {DESTINATIONS.map((dest) => (
                  <span
                    key={dest.slug}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7E0] bg-white px-3 py-1.5 text-xs font-medium text-[#3B443E]"
                  >
                    <PinIcon className="h-3 w-3 text-[#167A44]" />
                    {dest.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {!contentReady ? (
                Array.from({ length: 6 }).map((_, i) => <DestinationCardSkeleton key={i} />)
              ) : DESTINATIONS.length === 0 ? (
                <p className="col-span-full rounded-2xl border border-dashed border-[#E5E7E0] py-12 text-center text-sm text-[#6B7167]">
                  No destinations to show right now — check back soon.
                </p>
              ) : (
                DESTINATIONS.map((dest) => (
                  <DestinationCard
                    key={dest.slug}
                    dest={dest}
                    weatherEntry={weather[dest.slug]}
                    isSaved={savedSlugs.includes(dest.slug)}
                    onToggleSave={toggleSaved}
                  />
                ))
              )}
            </div>
          )}
        </section>

        {/* ---------- Featured packages ---------- */}
        <section className="bg-[#F5F4EF] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-[#167A44]">
                  Featured packages
                </span>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#14201A] sm:text-4xl">
                  Trips we&rsquo;ve already planned for you
                </h2>
              </div>
              <Link
                to="/packages"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#167A44] hover:text-[#125E36]"
              >
                View all packages
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {!contentReady ? (
                Array.from({ length: 4 }).map((_, i) => <PackageCardSkeleton key={i} />)
              ) : PACKAGES.length === 0 ? (
                <p className="col-span-full rounded-2xl border border-dashed border-[#E5E7E0] bg-white py-12 text-center text-sm text-[#6B7167]">
                  No packages to show right now — check back soon.
                </p>
              ) : (
                PACKAGES.map((pkg) => (
                  <Link
                    key={pkg.slug}
                    to={`/packages/${pkg.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7E0] bg-white transition-shadow hover:shadow-lg sm:flex-row"
                  >
                    <div className="h-40 w-full flex-shrink-0 overflow-hidden sm:h-auto sm:w-44">
                      <SmartImage
                        src={pkg.image}
                        alt={pkg.name}
                        fallbackLabel={pkg.name}
                        className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="inline-block w-fit rounded-full bg-[#1EA35B]/10 px-3 py-1 text-xs font-semibold text-[#167A44]">
                        {pkg.tag}
                      </span>
                      <h3 className="mt-3 text-lg font-bold text-[#14201A] transition-colors duration-300 motion-reduce:transition-none group-hover:text-[#167A44]">
                        {pkg.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-[#6B7167]">
                        {pkg.blurb}
                      </p>
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
                ))
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}