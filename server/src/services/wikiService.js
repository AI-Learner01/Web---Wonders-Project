const axios  = require('axios')
/**
 * Fetches summary details for a specific location from the Wikipedia REST API.
 * @param {string} locationName - The name of the city, country, or landmark.
 * @returns {Object|null} Cleaned summary object or null if not found.
 */

async function fetchLocation(locationName) {
    try {
        // Encode the location name to make it URL-safe
        const formattedTitle = encodeURIComponent(locationName.trim());
        
        // The Action API allows us to request specific properties:
        // - prop=extracts: Gets the article text
        // - exsentences=10: Grabs up to 10 sentences (instead of just 1 paragraph)
        // - explaintext=true: Strips out messy HTML
        // - prop=pageimages & pithumbsize=800: Gets a high-quality 800px image
        // - redirects=1: Automatically handles alternative names (e.g., "NYC" -> "New York City")
        const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages|description|coordinates&titles=${formattedTitle}&explaintext=true&exsentences=10&pithumbsize=800&redirects=1`;
        
        // Wikipedia API recommends adding a User-Agent header with contact info
        const response = await axios.get(wikiUrl, {
            headers: {
                "User-Agent": "AuraAvenue/1.0 (dnycoder07@gmail.com)"
            }
        })

        // The Action API returns data inside a dynamic "pages" object based on the page ID
        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0]; // Grab the first key (the page ID)

        // If the page ID is "-1", it means Wikipedia couldn't find the article
        if (pageId === "-1") {
            console.log(`Wikipedia page not found for location: ${locationName}`);
            return null; 
        }
        const pageData = pages[pageId];


        let coords = null;

        // Map only the data we care about for the travel website
        return {
            title: pageData.title,
            description: pageData.description || "Explore this beautiful destination",
            extract: pageData.extract || "No detailed information available.",
            thumbnail: pageData.thumbnail ? pageData.thumbnail.source : null,
            wikiUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(pageData.title.replace(/ /g, "_"))}`
        };
    } catch (error) {
        console.error("Error fetching from Wikipedia Action API:", error.message);
        throw error;
    }
}

module.exports = {
    fetchLocation
};