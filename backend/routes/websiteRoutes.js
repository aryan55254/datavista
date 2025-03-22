// routes/websiteRoutes.js
const express = require("express");
const { analyzeWebsite } = require("../controllers/websiteController");

const router = express.Router();

// POST /api/analyze-website
router.post("/analyze-website", analyzeWebsite);

module.exports = router;
