const axios = require('axios');

/**
 * Fetches a high-quality landscape image from Unsplash for a given location.
 * @param {string} locationName - The name of the city or destination.
 * @returns {string|null} The image URL or null if not found.
 */

async function fetchImageFromUnsplash(locationName) {
    try {
        const accessKey = process.env.UNSPLASH_ACCESS_KEY;
        if (!accessKey) {
            console.warn("Unsplash API key is missing from .env");
            return null;
        }

        // Add modifiers to force Unsplash to find scenic/tourism photos
        const searchQuery = `${locationName} travel landmark nature`;

        // Pass the new searchQuery into the URL instead of just locationName
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&orientation=landscape&per_page=1&client_id=${accessKey}`;
        const response = await axios.get(url);

        if (response.data.results && response.data.results.length > 0) {
            // Change from urls.regular to urls.full for higher quality hero backgrounds
            return response.data.results[0].urls.full; 
        }
        
        return null;
    } catch (error) {
        console.error("Unsplash API error:", error.message);
        return null;
    }
}

module.exports = {
    fetchImageFromUnsplash
};