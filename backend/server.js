// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Analytics routes (for tracking data, etc.)
const analyticsRoutes = require("./routes/analyticsRoutes");
app.use("/api", analyticsRoutes);

// Website analysis route
const websiteRoutes = require("./routes/websiteRoutes");
app.use("/api", websiteRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
