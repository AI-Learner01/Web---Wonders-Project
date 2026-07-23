const { collectionPackages } = require("../config/db");

// GET /api/packages
const getAllPackages = async (req, res) => {
    try {
        const packages = await collectionPackages.find({}).toArray();

        res.status(200).json({
            success: true,
            count: packages.length,
            data: packages
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