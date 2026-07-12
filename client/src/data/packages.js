import { images } from "./imageUrls";

const packages = [
  {
    id: 1,
    title: "Bali Escape",
    location: "Indonesia",
    duration: "5 Days / 4 Nights",
    price: 34999,
    originalPrice: 42999,
    rating: 4.8,
    image: images.packages.bali,
    features: ["Hotel", "Breakfast", "Flight"],
    badge: "Bestseller",
    itinerary: [
      "Ubud Temple Tour",
      "Nusa Penida Island",
      "Tanah Lot Sunset"
    ]
  },

  {
    id: 2,
    title: "Swiss Alps",
    location: "Switzerland",
    duration: "7 Days / 6 Nights",
    price: 79999,
    originalPrice: 89999,
    rating: 4.9,
    image: images.packages.switzerland,
    features: ["Hotel", "Guide", "Meals"],
    badge: "Luxury",
    itinerary: [
      "Jungfraujoch Excursion",
      "Lucerne City Tour",
      "Mt. Titlis Cable Ride"
    ]
  },

  {
    id: 3,
    title: "Goa Beach",
    location: "India",
    duration: "4 Days / 3 Nights",
    price: 18999,
    originalPrice: 22999,
    rating: 4.7,
    image: images.packages.goa,
    features: ["Resort", "Breakfast", "Pickup"],
    badge: "Popular",
    itinerary: [
      "Baga Beach",
      "Fort Aguada",
      "Mandovi River Cruise"
    ]
  },

  {
    id: 4,
    title: "Kashmir Paradise",
    location: "Jammu & Kashmir, India",
    duration: "6 Days / 5 Nights",
    price: 32999,
    originalPrice: 38999,
    rating: 4.9,
    image: images.packages.kashmir,
    features: ["Hotel", "Meals", "Guide"],
    badge: "Trending",
    itinerary: [
      "Dal Lake Shikara Ride",
      "Gulmarg Gondola",
      "Pahalgam Valley"
    ]

  },

  {
    id: 5,
    title: "Dubai Luxury Tour",
    location: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: 56999,
    originalPrice: 64999,
    rating: 4.8,
    image: images.packages.dubai,
    features: ["Hotel", "Flight", "Breakfast"],
    badge: "Luxury",
    itinerary: [
      "Burj Khalifa",
      "Desert Safari",
      "Dubai Marina Cruise"
    ]
  },

  {
    id: 6,
    title: "Maldives Honeymoon",
    location: "Maldives",
    duration: "5 Days / 4 Nights",
    price: 72999,
    originalPrice: 82999,
    rating: 5.0,
    image: images.packages.maldives,
    features: ["Resort", "Flight", "Meals"],
    badge: "Premium",
    itinerary: [
      "Water Villa Stay",
      "Snorkeling Adventure",
      "Sunset Dolphin Cruise"
    ]
  }
];

export default packages;