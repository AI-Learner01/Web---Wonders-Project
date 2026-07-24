const { collectionPackages } = require("../config/db");
const { fetchImageFromPexels } = require("../services/pexelsService");

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

module.exports = {
    getAllPackages
};