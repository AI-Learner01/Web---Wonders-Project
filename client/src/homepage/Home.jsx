import { Component, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../homepage/Navbar";
import Footer from "../homepage/Footer";
import {
  PinIcon,
  StarIcon,
  ArrowIcon,
  CheckIcon,
  CalendarIcon,
  HeartIcon,
} from "../homepage/Icons";

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

function NewsItem({ item }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-2xl border border-[#E5E7E0] bg-white p-5 transition-shadow hover:shadow-md"
    >
      <span className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${item.dotClass}`} aria-hidden="true" />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${item.tagClass}`}>
            {item.tag}
          </span>
          <span className="text-xs text-[#8A9089]">{item.date}</span>
        </div>
        <h3 className="mt-2 text-base font-bold text-[#14201A] transition-colors duration-300 motion-reduce:transition-none group-hover:text-[#167A44]">
          {item.headline}
        </h3>
        <p className="mt-1 text-sm text-[#6B7167]">{item.blurb}</p>
      </div>
      <ArrowIcon className="mt-1.5 h-4 w-4 flex-shrink-0 text-[#8A9089] transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:translate-x-1 group-hover:text-[#167A44]" />
    </a>
  );
}

function NewsItemSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#E5E7E0] bg-white p-5" aria-hidden="true">
      <span className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 animate-pulse rounded-full bg-[#E5E7E0]" />
      <div className="flex-1 space-y-2.5">
        <div className="h-3 w-24 animate-pulse rounded-full bg-[#E5E7E0]" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-[#E5E7E0]" />
        <div className="h-3 w-full animate-pulse rounded bg-[#E5E7E0]" />
      </div>
    </div>
  );
}

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
            From <span className="font-semibold text-[#14201A]">{formatINR(dest.price)}</span> / person
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
/* Data                                                       */
/* ---------------------------------------------------------- */

const TRUST_POINTS = [
  { title: "Best Price Guarantee", desc: "Find it cheaper, we'll match it" },
  { title: "24/7 Travel Support", desc: "Real humans, day or night" },
  { title: "Handpicked Stays", desc: "Every property vetted by our team" },
  { title: "50,000+ Happy Travelers", desc: "And counting, every year" },
];

const FALLBACK_NEWS = [
  {
    id: "japan-visa",
    tag: "Entry Requirements",
    date: "2 days ago",
    headline: "Japan Extends Visa-Free Stay to 90 Days for 68 Countries",
    blurb: "Travelers from eligible countries can now stay longer without applying for a separate visa.",
    tagClass: "bg-[#1EA35B]/10 text-[#167A44]",
    dotClass: "bg-[#167A44]",
    url: "#"
  },
  {
    id: "santorini-cap",
    tag: "Travel Advisory",
    date: "4 days ago",
    headline: "Santorini Introduces Daily Visitor Cap Starting This Summer",
    blurb: "A new cap on cruise-ship arrivals aims to ease crowding in Fira and Oia during peak season.",
    tagClass: "bg-[#FEF3E2] text-[#B4690E]",
    dotClass: "bg-[#F2A93B]",
    url: "#"
  },
  {
    id: "marrakech-routes",
    tag: "New Route",
    date: "1 week ago",
    headline: "New Direct Flights Connect Marrakech to 12 European Cities",
    blurb: "Two low-cost carriers added routes this month, cutting average travel time by nearly two hours.",
    tagClass: "bg-[#E8F0FE] text-[#1D4ED8]",
    dotClass: "bg-[#3B82F6]",
    url: "#"
  },
  {
    id: "machu-picchu-trail",
    tag: "Trail Update",
    date: "1 week ago",
    headline: "Machu Picchu Reopens Sunrise Access After Trail Restoration",
    blurb: "Early-morning entry permits are back on sale after a six-week maintenance closure.",
    tagClass: "bg-[#E0F7F4] text-[#0E6E68]",
    dotClass: "bg-[#0E6E68]",
    url: "#"
  },
  {
    id: "swiss-snowfall",
    tag: "Weather",
    date: "2 weeks ago",
    headline: "Swiss Alps Resorts Report Record Early Snowfall This Season",
    blurb: "Several resorts opened three weeks ahead of schedule thanks to an unusually cold October.",
    tagClass: "bg-[#EAF6FA] text-[#1E5FA8]",
    dotClass: "bg-[#1E5FA8]",
    url: "#"
  },
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

const WEATHER_ENDPOINT = "https://api.open-meteo.com/v1/forecast";

const USD_TO_INR = 95.5;

function formatINR(usd) {
  const inr = Math.round((usd * USD_TO_INR) / 100) * 100;
  return `₹${inr.toLocaleString("en-IN")}`;
}

/* ---------------------------------------------------------- */
/* Page                                                        */
/* ---------------------------------------------------------- */

export default function Home() {
  const [weather, setWeather] = useState({});
  const [contentReady, setContentReady] = useState(false);
  const [savedSlugs, setSavedSlugs] = useState(getInitialSaved);
  
  // State for completely dynamic news
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const lastQueryRef = useRef(""); // Keeps track of what we just searched so we don't repeat it

  const recommendedScrollerRef = useRef(null);
  const heroScrollerRef = useRef(null);
  const [activeShowcase, setActiveShowcase] = useState(0);

  const handleHeroScroll = () => {
    const el = heroScrollerRef.current;
    if (!el || !el.firstChild) return;
    const cardWidth = el.firstChild.getBoundingClientRect().width + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveShowcase(Math.max(0, Math.min(index, DESTINATIONS.length - 1)));
  };

  const scrollHero = (direction) => {
    const el = heroScrollerRef.current;
    if (!el || !el.firstChild) return;
    const cardWidth = el.firstChild.getBoundingClientRect().width + 16;
    el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  const scrollHeroToIndex = (index) => {
    const el = heroScrollerRef.current;
    if (!el || !el.firstChild) return;
    const cardWidth = el.firstChild.getBoundingClientRect().width + 16;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedSlugs));
    } catch {
      
    }
  }, [savedSlugs]);

  const toggleSaved = (slug) => {
    setSavedSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  const recommendations = useMemo(() => {
    const liked = DESTINATIONS.filter((d) => savedSlugs.includes(d.slug));

    if (liked.length === 0) {
      return {
        basedOn: null,
        items: [...DESTINATIONS].sort((a, b) => b.rating - a.rating).slice(0, 4),
      };
    }

    const likedTags = new Set(liked.flatMap((d) => d.tags));
    const scored = DESTINATIONS.map((d) => ({
      dest: d,
      score: d.tags.filter((t) => likedTags.has(t)).length,
    })).sort((a, b) => b.score - a.score || b.dest.rating - a.dest.rating);

    const withOverlap = scored.filter((s) => s.score > 0).map((s) => s.dest);
    const items = (withOverlap.length > 0 ? withOverlap : scored.map((s) => s.dest)).slice(0, 4);

    return { basedOn: liked[liked.length - 1].name, items };
  }, [savedSlugs]);

  const scrollRecommended = (direction) => {
    const el = recommendedScrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.9, 600), behavior: "smooth" });
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setContentReady(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  // Fetch Live Weather
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


  // --- NEW LOGIC: Fetch entirely fresh news by randomizing the search query ---
  const fetchTravelNews = async () => {
    setNewsLoading(true); // Triggers the skeleton loaders immediately
    
    try {
      // A pool of different travel topics to guarantee fresh results and bypass the API cache
      const TRAVEL_QUERIES = [
        "travel+tourism+news",
        "global+travel+destinations",
        "airline+flight+updates",
        "hotel+and+resort+news",
        "sustainable+eco+tourism",
        "adventure+travel+trends",
        "luxury+vacation+destinations",
        "budget+backpacking+travel",
        "cruise+ship+tourism",
        "international+visa+updates"
      ];
      
      // Pick a random topic, but ensure it is different from the last one we just searched
      let randomQuery = TRAVEL_QUERIES[Math.floor(Math.random() * TRAVEL_QUERIES.length)];
      while(randomQuery === lastQueryRef.current) {
          randomQuery = TRAVEL_QUERIES[Math.floor(Math.random() * TRAVEL_QUERIES.length)];
      }
      lastQueryRef.current = randomQuery;

      // Construct the Google URL with our new random topic
      const googleNewsRSS = `https://news.google.com/rss/search?q=${randomQuery}&hl=en-US&gl=US&ceid=US:en`;
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(googleNewsRSS)}`;

      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch from RSS2JSON");
      
      const data = await res.json();
      
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        const themes = [
          { tagClass: "bg-[#1EA35B]/10 text-[#167A44]", dotClass: "bg-[#167A44]" },
          { tagClass: "bg-[#FEF3E2] text-[#B4690E]", dotClass: "bg-[#F2A93B]" },
          { tagClass: "bg-[#E8F0FE] text-[#1D4ED8]", dotClass: "bg-[#3B82F6]" },
          { tagClass: "bg-[#E0F7F4] text-[#0E6E68]", dotClass: "bg-[#0E6E68]" },
          { tagClass: "bg-[#EAF6FA] text-[#1E5FA8]", dotClass: "bg-[#1E5FA8]" },
        ];

        // Only take the top 5 from this fresh batch
        const dynamicNews = data.items.slice(0, 5).map((article, i) => {
          const dateObj = new Date(article.pubDate);
          const dateStr = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          
          let sourceName = "Travel News";
          try {
              const urlObj = new URL(article.link);
              sourceName = urlObj.hostname.replace('www.', '');
          } catch(e) {}

          return {
            id: article.guid || article.link,
            tag: sourceName,
            date: dateStr,
            headline: article.title,
            blurb: "Click here to read the full story and stay updated on the latest global travel trends.",
            url: article.link,
            ...themes[i % themes.length],
          };
        });
        
        setNewsUpdates(dynamicNews);
      } else {
        setNewsUpdates(FALLBACK_NEWS);
      }
    } catch (error) {
      console.error("Live News Error:", error);
      setNewsUpdates(FALLBACK_NEWS); 
    } finally {
      setNewsLoading(false); // Remove the skeleton loaders
    }
  };

  // Run this function once when the page first loads
  useEffect(() => {
    fetchTravelNews();
  }, []);


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-[#14201A]">

        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-[#0F1D16]">
          <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#167A44]/25 blur-3xl" aria-hidden="true" />

          <style>{`
            .aura-scroll-hide::-webkit-scrollbar { display: none; }
            .aura-scroll-hide { scrollbar-width: none; -ms-overflow-style: none; }
          `}</style>

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
            <div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#3DD68C]">
                <PinIcon className="h-3.5 w-3.5" />
                Handpicked Journeys
              </span>

              <h1 className="mt-6 font-serif text-4xl italic leading-[1.15] text-white sm:text-5xl lg:text-[3.4rem]">
                Adventures that
                <br />
                <span className="not-italic font-sans text-3xl font-extrabold uppercase tracking-tight text-[#3DD68C] sm:text-4xl lg:text-5xl">
                  Stay With You
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base text-white/70 sm:text-lg">
                From cliffside sunsets to ancient temple gates — we sort out the
                logistics so you can just show up and explore.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/destinations"
                  className="rounded-full bg-[#3DD68C] px-7 py-3.5 text-sm font-bold text-[#0F1D16] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(61,214,140,0.5)] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  Browse Destinations
                </Link>
                <Link
                  to="/packages"
                  className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  View Packages
                </Link>
              </div>

              <div className="mt-7 flex items-center gap-2">
                <StarIcon className="h-4 w-4 text-[#F2A93B]" />
                <span className="text-sm text-white/80">
                  <strong className="font-bold text-white">4.9/5</strong> from 12,400+ travelers
                </span>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -right-5 -top-5 hidden h-full w-full rounded-[2rem] border-2 border-[#3DD68C]/30 sm:block lg:-right-7 lg:-top-7"
                aria-hidden="true"
              />

              <div
                ref={heroScrollerRef}
                onScroll={handleHeroScroll}
                className="aura-scroll-hide relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth rounded-[2rem]"
              >
                {DESTINATIONS.map((dest) => (
                  <div
                    key={dest.slug}
                    className="relative aspect-[4/3] w-full flex-shrink-0 snap-center overflow-hidden rounded-[2rem] shadow-2xl sm:aspect-[16/11] lg:aspect-[4/5]"
                  >
                    <SmartImage
                      src={dest.image}
                      alt={`${dest.name}, ${dest.country}`}
                      priority={dest.slug === DESTINATIONS[0].slug}
                      fallbackLabel={dest.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F1D16]/80 to-transparent px-5 py-4">
                      <p className="text-sm font-bold text-white">{dest.name}</p>
                      <p className="text-xs text-white/70">{dest.country}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-2 lg:flex">
                <button
                  type="button"
                  onClick={() => scrollHero(-1)}
                  aria-label="Previous destination photo"
                  className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#14201A] shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD68C] focus-visible:ring-offset-1"
                >
                  <ArrowIcon className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollHero(1)}
                  aria-label="Next destination photo"
                  className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#14201A] shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD68C] focus-visible:ring-offset-1"
                >
                  <ArrowIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex justify-center gap-1.5 lg:hidden" role="tablist" aria-label="Destination photo selector">
                {DESTINATIONS.map((dest, i) => (
                  <button
                    key={dest.slug}
                    type="button"
                    role="tab"
                    aria-selected={i === activeShowcase}
                    aria-label={`Show ${dest.name} photo`}
                    onClick={() => scrollHeroToIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD68C] ${
                      i === activeShowcase ? "w-6 bg-[#3DD68C]" : "w-2 bg-white/25"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute -bottom-6 left-4 hidden rounded-2xl border border-[#E5E7E0] bg-white px-5 py-4 shadow-xl sm:-left-8 sm:block">
                <div className="flex items-center gap-2">
                  <PinIcon className="h-4 w-4 text-[#167A44]" />
                  <span className="text-sm font-bold text-[#14201A]">40+ destinations</span>
                </div>
                <p className="mt-0.5 text-xs text-[#6B7167]">across 6 continents</p>
              </div>
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

        {/* ---------- News & updates (Powered by Google News) ---------- */}
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#167A44]">
                Travel news
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#14201A] sm:text-4xl">
                Updates from tours around the world
              </h2>
            </div>
            
            <button
              onClick={fetchTravelNews} 
              disabled={newsLoading}
              className="group inline-flex items-center gap-1.5 rounded-full border border-[#E5E7E0] bg-white px-5 py-2 text-sm font-semibold text-[#167A44] shadow-sm transition-all hover:bg-[#F5F4EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167A44] focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg 
                className={`h-4 w-4 transition-transform duration-500 ease-in-out ${newsLoading ? 'animate-spin' : 'group-active:rotate-180'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {newsLoading ? 'Fetching...' : 'Refresh News'}
            </button>
          </div>

          <div className="mt-8 space-y-4">
            {newsLoading
              ? Array.from({ length: 5 }).map((_, i) => <NewsItemSkeleton key={i} />)
              : newsUpdates.map((item) => <NewsItem key={item.id} item={item} />)}
          </div>
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
                          {formatINR(pkg.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

      </div>
    </ErrorBoundary>
  );
}