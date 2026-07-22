const express = require("express");

const router = express.Router();

const { pendingQueries,updateQueryStatus, resolvedQueries} = require("../controllers/adminController");



router.get("/pending-queries", pendingQueries);

router.patch("/resolve-query", updateQueryStatus);

router.get("/resolved-queries", resolvedQueries);

module.exports = router;