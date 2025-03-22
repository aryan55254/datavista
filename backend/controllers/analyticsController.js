// controllers/analyticsController.js
const View = require("../models/View");

// Track a new page view
exports.trackView = async (req, res) => {
  try {
    // We'll receive { url, referrer, userAgent, sessionId } in the body
    const { url, referrer, userAgent, sessionId } = req.body;

    // We can also get IP from req.ip or req.headers
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const view = new View({ url, referrer, userAgent, sessionId, ip });
    await view.save();

    res.json({ message: "View tracked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get analytics summary (protected route)
exports.getAnalyticsSummary = async (req, res) => {
  try {
    // Total views
    const totalViews = await View.countDocuments();

    // Unique sessions (rough measure of unique visitors)
    const uniqueSessions = await View.distinct("sessionId");

    // Top 5 pages
    const topPagesAgg = await View.aggregate([
      { $group: { _id: "$url", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Views over time (daily)
    const viewsOverTime = await View.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.json({
      totalViews,
      uniqueVisitors: uniqueSessions.length,
      topPages: topPagesAgg,
      viewsOverTime,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
