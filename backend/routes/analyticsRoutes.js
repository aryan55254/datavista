// routes/analyticsRoutes.js
const express = require("express");
const { trackView, getAnalyticsSummary } = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public route for tracking (no auth required, or minimal checks)
router.post("/track", trackView);

// Protected route for analytics summary
router.get("/analytics-summary", authMiddleware, getAnalyticsSummary);

module.exports = router;
