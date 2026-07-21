// Fixes 'querySrv ECONNREFUSED' issue by forcing IPv4 resolution first
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

require("dotenv").config();
const { MongoClient } = require("mongodb");

// Initialize MongoDB Client
const client = new MongoClient(process.env.MONGODB_URI);

// 1. Establish connections to both separate databases inside your cluster
const dbAuth = client.db("WebWonder"); 
const dbDest = client.db("DestinationsNameForSearch");

// 2. Map the collections to their respective databases
const collectionUserData = dbAuth.collection("UserData");
const collectionOtps = dbAuth.collection("Otps");
const collectionDestinations = dbDest.collection("Destinations");
const collectionQuries = dbAuth.collection("Queries"); 

/**
 * Connects to MongoDB Atlas Cluster and ensures indexes are created
 */
async function connectDB() {
    try {
        await client.connect();
        console.log("MongoDB Connected to Atlas Cluster successfully.");
        
        // Optimizes lookups on your 50k+ cities collection
        await collectionDestinations.createIndex({ city: 1 });
    } catch (err) {
        console.error("MongoDB Connection Failed:", err.message);
    }
}

module.exports = {
    connectDB,
    db: dbDest,              // Default 'db' export targeting cities for autocomplete
    dbAuth,                  // Exported for direct authentication db manipulation
    collectionUserData,
    collectionOtps,
    collectionDestinations,   // Exported so controllers can explicitly query the dataset
    collectionQuries          // Exported for logging user queries
};