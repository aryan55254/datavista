// routes/scrapeRoutes.js
const express = require("express");
const  scrapeWebsite  = require("../controllers/scrapeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route: only logged-in users (with a valid token) can access this endpoint.
router.post("/scrape", authMiddleware, scrapeWebsite);

module.exports = router;
