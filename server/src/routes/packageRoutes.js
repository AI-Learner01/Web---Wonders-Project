const express = require("express");
const router = express.Router();
const { getAllPackages, getPackageAttractions } = require("../controllers/packageController");

// GET /api/packages
router.get("/", getAllPackages);

// GET /api/packages/:id/attractions
router.get("/:id/attractions", getPackageAttractions);
module.exports = router;