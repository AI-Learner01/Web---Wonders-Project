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
    badge: "Bestseller"
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
    badge: "Luxury"
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
    badge: "Popular"
  }
];

export default packages;