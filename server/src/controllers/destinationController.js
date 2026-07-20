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


module.exports = {
    getDestinationInfo
};