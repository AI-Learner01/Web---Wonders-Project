const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("WebWonderLocal");

const collectionUserData = db.collection("UserData");
const collectionOtps = db.collection("Otps");

async function connectDB() {

    await client.connect();

    console.log("MongoDB Connected");

}

module.exports = {
    connectDB,
    collectionUserData,
    collectionOtps
};