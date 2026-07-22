const express = require("express");

const router = express.Router();

const { pendingQueries,updateQueryStatus, resolvedQueries ,getAdminOtpLogs} = require("../controllers/adminController");



router.get("/pending-queries", pendingQueries);

router.patch("/resolve-query", updateQueryStatus);

router.get("/resolved-queries", resolvedQueries);

router.get("/admin-otp", getAdminOtpLogs);

module.exports = router;