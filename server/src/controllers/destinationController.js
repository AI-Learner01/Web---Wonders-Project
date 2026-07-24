
const { db, collectionDestinations } = require('../config/db');
const { fetchWeather } = require('../services/weatherService');
const { fetchLocation } = require('../services/wikiService')
const { fetchImageFromUnsplash } = require('../services/imageService')



const getDestinationInfo = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Location 'name' query parameter is required."
            });
        }

        // Fetch Wiki data
        const wikiData = await fetchLocation(name);
        if (!wikiData) {
            return res.status(404).json({
                success: false,
                message: `Could not find any Wikipedia information for '${name}'.`
            });
        }

        // Check Database for an existing image (Case-insensitive search)
        let destinationRecord = await collectionDestinations.findOne({
            city: { $regex: `^${name.trim()}$`, $options: "i" }
        });

        let heroImageUrl = null;

        if (destinationRecord && destinationRecord.imageUrl) {
            // CACHE HIT: Image exists in our database
            heroImageUrl = destinationRecord.imageUrl;
            console.log(`Served image for ${name} from MongoDB Cache`);
        }

        else {
            // CACHE MISS: No image in DB, fetch from Unsplash
            heroImageUrl = await fetchImageFromUnsplash(name);

            if (heroImageUrl) {
                console.log(`Fetched new image for ${name} from Unsplash`);
            } else {
                console.log(`Failed to fetch Unsplash image for ${name}. (Check API limits in terminal)`);
            }

            // FIX: ALWAYS save to MongoDB! Even if Unsplash fails, we want the city recorded.
            await collectionDestinations.updateOne(
                { city: { $regex: `^${name.trim()}$`, $options: "i" } },
                {
                    $set: {
                        city: name.trim(),
                        // Only add imageUrl to the database if we actually got one
                        ...(heroImageUrl && { imageUrl: heroImageUrl })
                    },
                    $setOnInsert: { country: wikiData.description || "Unknown" }
                },
                { upsert: true }
            );
        }

        // Attach the high-quality image to the response (fallback to Wiki thumbnail if Unsplash fails)
        wikiData.heroImage = heroImageUrl || wikiData.thumbnail;

        return res.status(200).json({
            success: true,
            data: {
                ...wikiData,
                caption: wikiData.travelCaption // Pass tourism caption
            }
        });

    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve location details.",
            error: error.message
        });
    }
};

//Autocomplete Destination Suggestions
const getAutocompleteSuggestions = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.trim() === "") {
            return res.status(200).json([]);
        }

        // Search the "city" field using a case-insensitive prefix regex matching your CSV structures
        const suggestions = await db.collection("Destinations")
            .find({ city: { $regex: `^${q.trim()}`, $options: "i" } })
            .project({ city: 1, country: 1, _id: 0 })
            .limit(6) // Limit results to prevent UI crowding
            .toArray();

        // Standardize output keys to match the frontend expected format
        const formattedSuggestions = suggestions.map(place => ({
            name: place.city,
            country: place.country
        }));

        return res.status(200).json(formattedSuggestions);
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Autocomplete failed.",
            error: error.message
        });
    }
};

const getDestinationWeather = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Location 'name' query parameter is required."
            });
        }

        const weatherData = await fetchWeather(name);

        if (!weatherData) {
            return res.status(404).json({
                success: false,
                message: `Weather data not found for location '${name}'.`
            });
        }

        return res.status(200).json({
            success: true,
            data: weatherData
        });
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch weather data.",
            error: error.message
        });
    }
}

module.exports = {
    getDestinationInfo,
    getAutocompleteSuggestions,
    getDestinationWeather
};