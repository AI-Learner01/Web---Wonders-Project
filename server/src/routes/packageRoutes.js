const express = require("express");

const router = express.Router();

const { getAllPackages } = require("../controllers/packageController");

// GET /api/packages
router.get("/", getAllPackages);

module.exports = router;