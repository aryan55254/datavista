// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://scrapesift-frontend.vercel.app", // Ensure it's set
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);
app.options("*", cors()); // Handle preflight requests

//root path route 
app.get('/' , (req,res) => {
  res.send('BACKEND is running');
});
// Auth routes (if you still want authentication)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Website analyzer route
const { scrapeWebsite } = require("./controllers/scrapeController");
app.use("/api", scrapeWebsite);

mongoose
  .connect(process.env.MONGO_URI, )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
