// routes/scrapeRoutes.js
const express = require("express");
const { scrapeWebsite } = require("../controllers/scrapeController");

const router = express.Router();

// POST /api/scrape to scrape a website
router.post("/scrape", scrapeWebsite);

module.exports = router;
