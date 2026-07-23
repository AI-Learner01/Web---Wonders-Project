require("dotenv").config();
const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

const types = ["Beach", "Mountains", "City", "Adventure", "Nature", "Luxury"];
const badges = ["Bestseller", "Luxury", "Trending", "Popular", "Premium", "Top Rated"];
const featuresList = ["Hotel", "Flight", "Breakfast", "Meals", "Guide", "Cruise", "Sightseeing", "Transfers"];
const themes = ["Escape", "Explorer", "Adventure", "Getaway", "Retreat", "Discovery", "Experience"];

// Massive global array so search yields results for almost any major region
const targetDestinations = [
    // Asia
    { city: "Bali", country: "Indonesia", continent: "Asia", category: "International" },
    { city: "Tokyo", country: "Japan", continent: "Asia", category: "International" },
    { city: "Bangkok", country: "Thailand", continent: "Asia", category: "International" },
    { city: "Dubai", country: "UAE", continent: "Asia", category: "International" },
    { city: "Singapore", country: "Singapore", continent: "Asia", category: "International" },
    { city: "Seoul", country: "South Korea", continent: "Asia", category: "International" },
    
    // India
    { city: "Goa", country: "India", continent: "Asia", category: "India" },
    { city: "Kashmir", country: "India", continent: "Asia", category: "India" },
    { city: "Shimla", country: "India", continent: "Asia", category: "India" },
    { city: "Jaipur", country: "India", continent: "Asia", category: "India" },
    { city: "Kerala", country: "India", continent: "Asia", category: "India" },
    { city: "Agra", country: "India", continent: "Asia", category: "India" },
    { city: "Maldives", country: "Maldives", continent: "Asia", category: "International" }, // Near India

    // Europe
    { city: "Paris", country: "France", continent: "Europe", category: "International" },
    { city: "Santorini", country: "Greece", continent: "Europe", category: "International" },
    { city: "London", country: "United Kingdom", continent: "Europe", category: "International" },
    { city: "Rome", country: "Italy", continent: "Europe", category: "International" },
    { city: "Barcelona", country: "Spain", continent: "Europe", category: "International" },
    { city: "Swiss Alps", country: "Switzerland", continent: "Europe", category: "International" },
    { city: "Amsterdam", country: "Netherlands", continent: "Europe", category: "International" },

    // North America
    { city: "New York", country: "USA", continent: "North America", category: "International" },
    { city: "Hawaii", country: "USA", continent: "North America", category: "International" },
    { city: "Banff", country: "Canada", continent: "North America", category: "International" },
    { city: "Cancun", country: "Mexico", continent: "North America", category: "International" },

    // South America
    { city: "Rio de Janeiro", country: "Brazil", continent: "South America", category: "International" },
    { city: "Cusco", country: "Peru", continent: "South America", category: "International" },
    { city: "Buenos Aires", country: "Argentina", continent: "South America", category: "International" },

    // Africa
    { city: "Cape Town", country: "South Africa", continent: "Africa", category: "International" },
    { city: "Cairo", country: "Egypt", continent: "Africa", category: "International" },
    { city: "Marrakech", country: "Morocco", continent: "Africa", category: "International" },

    // Australia/Oceania
    { city: "Sydney", country: "Australia", continent: "Australia", category: "International" },
    { city: "Queenstown", country: "New Zealand", continent: "Australia", category: "International" },
    { city: "Bora Bora", country: "French Polynesia", continent: "Australia", category: "International" }
];

async function seedFakePackages() {
    try {
        await client.connect();
        console.log("Connected to MongoDB for Global Seeding...");
        
        const db = client.db("WebWonder");
        const packagesCollection = db.collection("Packages");

        const bulkOperations = [];

        // Loop through all 30+ destinations
        for (const dest of targetDestinations) {
            
            // Randomly pick between 4 and 5 packages for this destination
            const packagesToGenerate = faker.number.int({ min: 4, max: 5 }); 
            
            // Shuffle themes to ensure distinct names (e.g. "Paris Escape", "Paris Getaway")
            const shuffledThemes = faker.helpers.shuffle(themes);

            for (let i = 0; i < packagesToGenerate; i++) { 
                const price = faker.number.int({ min: 25000, max: 180000 });
                const durationDays = faker.number.int({ min: 3, max: 14 });
                const type = faker.helpers.arrayElement(types);
                const theme = shuffledThemes[i]; // Guaranteed unique theme for this city loop
                
                const packageTitle = `${dest.city} ${theme}`;

                // Force rating to exactly 1 decimal point (e.g., 4.0, 4.5, 4.9)
                const preciseRating = Number((Math.random() * (5.0 - 3.8) + 3.8).toFixed(1));

                // Generate a unique image lock ID so the image loads perfectly and never flickers
                const imageLock = faker.number.int({ min: 1000, max: 9999 });
                const safeCityStr = encodeURIComponent(dest.city.toLowerCase());

                const newPackage = {
                    title: packageTitle,
                    location: `${dest.city}, ${dest.country}`,
                    country: dest.country,
                    continent: dest.continent,
                    category: dest.category,
                    type: type,
                    duration: `${durationDays} Days / ${durationDays - 1} Nights`,
                    price: price,
                    originalPrice: price + faker.number.int({ min: 4000, max: 20000 }),
                    rating: preciseRating,
                    // Reliable image generator matching the city keywords
                    image: `https://loremflickr.com/800/600/${safeCityStr},travel/all?lock=${imageLock}`, 
                    features: faker.helpers.arrayElements(featuresList, 3),
                    badge: faker.helpers.arrayElement(badges),
                    itinerary: [
                        `Arrival and check-in at a premium accommodation in ${dest.city}`,
                        `Guided exploration of iconic landmarks and hidden gems`,
                        `Free day for leisure, local cuisine, and personal discovery`,
                        `Departure and private transfer to the airport`
                    ]
                };

                // Upsert to ensure no duplicates
                bulkOperations.push({
                    updateOne: {
                        filter: { title: packageTitle }, 
                        update: { $setOnInsert: newPackage }, 
                        upsert: true 
                    }
                });
            }
        }

        // Execute all database operations at once
        const result = await packagesCollection.bulkWrite(bulkOperations);
        console.log(`Global Seeding Complete! ${result.upsertedCount} new unique packages added.`);

    } catch (err) {
        console.error("Error Seeding:", err);
    } finally {
        await client.close();
        process.exit(0);
    }
}

seedFakePackages();