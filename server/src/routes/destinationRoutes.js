const express = require('express')
const router = express.Router()

const { getDestinationInfo, getAutocompleteSuggestions } = require('../controllers/destinationController')

// Route to get destination overview details
router.get("/info", getDestinationInfo);

// Route to handle live search text autocomplete dropdowns
router.get("/autocomplete", getAutocompleteSuggestions);

module.exports = router;