const express = require("express");

/**
 * 
 * this module defines the admin routes for the application, including fetching pending queries, updating query status, fetching resolved queries, and retrieving admin OTP logs. It imports the necessary controller functions from adminController.js and sets up the corresponding routes using Express Router.
 * @module adminRoutes
 * @requires express
 * @requires ../controllers/adminController
 * @returns {Object} router - Express Router object with defined admin routes
 */


const router = express.Router();

const { pendingQueries,updateQueryStatus, resolvedQueries ,getAdminOtpLogs} = require("../controllers/adminController");



router.get("/pending-queries", pendingQueries);

router.patch("/resolve-query", updateQueryStatus);

router.get("/resolved-queries", resolvedQueries);

router.get("/admin-otp", getAdminOtpLogs);

module.exports = router;