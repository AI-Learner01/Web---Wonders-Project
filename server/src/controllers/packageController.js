const { collectionPackages } = require("../config/db");
const { fetchImageFromPexels } = require("../services/pexelsService");
const { fetchAttractionsFromGeoapify } = require("../services/geoapifyService");
const { ObjectId } = require("mongodb");

// GET /api/packages
const getAllPackages = async (req, res) => {
    try {
        const packages = await collectionPackages.find({}).toArray();

        // Check for missing/placeholder images and update MongoDB on the fly
        const cachedPackages = await Promise.all(
            packages.map(async (pkg) => {
                // Check if the image is missing, a placeholder, or a generic link
                const isCacheMiss = 
                    !pkg.image || 
                    pkg.image.includes("picsum.photos") || 
                    pkg.image.includes("placeholder");

                if (isCacheMiss) {
                    // CACHE MISS: Query Pexels API using location or title
                    const queryLocation = pkg.location || pkg.title;
                    const newImageUrl = await fetchImageFromPexels(queryLocation);

                    if (newImageUrl) {
                        // SAVE TO MONGO: Permanently update document in Atlas
                        await collectionPackages.updateOne(
                            { _id: pkg._id },
                            { $set: { image: newImageUrl } }
                        );
                        
                        pkg.image = newImageUrl;
                        console.log(`[Pexels Cache Saved] MongoDB updated for: ${pkg.title}`);
                    }
                }

                return pkg;
            })
        );

        res.status(200).json({
            success: true,
            count: cachedPackages.length,
            data: cachedPackages
        });
    } catch (error) {
        console.error("Error fetching packages:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch packages"
        });
    }
};

// GET /api/packages/:id/attractions
const getPackageAttractions = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Ensure ID is valid
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Package ID" });
        }

        const pkg = await collectionPackages.findOne({ _id: new ObjectId(id) });

        if (!pkg) {
            return res.status(404).json({ success: false, message: "Package not found" });
        }

        // --- CACHE HIT: Attractions already exist in MongoDB ---
        if (pkg.attractions && pkg.attractions.length > 0) {
            console.log(`[Cache Hit] Served attractions for: ${pkg.title}`);
            return res.status(200).json({ success: true, source: 'cache', data: pkg.attractions });
        }

        // --- CACHE MISS: Fetch from Geoapify ---
        console.log(`[Cache Miss] Fetching Geoapify attractions for: ${pkg.title}`);
        const queryLocation = pkg.location || pkg.title;
        const attractions = await fetchAttractionsFromGeoapify(queryLocation);

        // --- SAVE TO MONGODB ---
        if (attractions && attractions.length > 0) {
            await collectionPackages.updateOne(
                { _id: pkg._id },
                { $set: { attractions: attractions } }
            );
        }

        return res.status(200).json({ success: true, source: 'api', data: attractions || [] });
    } catch (error) {
        console.error("Error fetching attractions:", error);
        res.status(500).json({ success: false, message: "Failed to fetch attractions" });
    }
};


// --- ADD THIS TO packageController.js ---

// POST /api/packages/:id/reviews
const addPackageReview = async (req, res) => {
    try {
        const { id } = req.params;
        const reviewData = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Package ID" });
        }

        // Add a unique ID and timestamp to the review
        const newReview = {
            ...reviewData,
            id: Date.now(),
            date: Date.now()
        };

        // Push the new review into the package's 'reviews' array in MongoDB
        const result = await collectionPackages.updateOne(
            { _id: new ObjectId(id) },
            { $push: { reviews: { $each: [newReview], $position: 0 } } } // Adds to the top of the list
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Package not found" });
        }

        res.status(201).json({ success: true, message: "Review added successfully", review: newReview });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ success: false, message: "Failed to add review" });
    }
};

module.exports = {
    getAllPackages,
    getPackageAttractions,
    addPackageReview
};