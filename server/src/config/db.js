require("dotenv").config();

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

// 1. Establish connections to both separate databases inside your cluster
const dbAuth = client.db("WebWonder"); 
const dbDest = client.db("DestinationsNameForSearch");

// 2. Map the collections to their respective databases
const collectionUserData = dbAuth.collection("UserData");
const collectionOtps = dbAuth.collection("Otps");
const collectionDestinations = dbDest.collection("Destinations");
const collectionPackages = dbAuth.collection("Packages");
const collectionBookings = dbAuth.collection("Bookings");

async function connectDB() {
    try {
        await client.connect();
        console.log("MongoDB Connected to Atlas Cluster successfully.");
        
        // Optimizes lookups on your newly imported 50k+ cities collection
        await collectionDestinations.createIndex({ city: 1 });
    } catch (err) {
        console.error("MongoDB Connection Failed:", err.message);
    }
}

module.exports = {
    connectDB,
    db: dbDest, // Keeps a default 'db' export targeting your cities for the autocomplete controller
    dbAuth,     // Exported in case you need direct db manipulation later
    collectionUserData,
    collectionOtps,
    collectionDestinations, // Exported so controllers can explicitly query the dataset
    collectionPackages,
    collectionBookings
};