const express = require('express')
const router = express.Router()

const {getDestinationInfo} = require('../controllers/destinationController')

// Route to get destination overview details
router.get("/info", getDestinationInfo);

module.exports = router;