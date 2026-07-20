
const {db} = require('../config/db')
const {fetchLocation} = require('../services/wikiService')

const getDestinationInfo = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Location 'name' query parameter is required."
            });
        }

        const wikiData = await fetchLocation(name);

        if (!wikiData) {
            return res.status(404).json({
                success: false,
                message: `Could not find any Wikipedia information for '${name}'.`
            });
        }

        return res.status(200).json({
            success: true,
            data: wikiData
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve location details.",
            error: error.message
        });
    }
}

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


module.exports = {
    getDestinationInfo,
    getAutocompleteSuggestions
};