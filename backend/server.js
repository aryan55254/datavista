// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors({
  origin : ['https://scrapesift.vercel.app/']
}));
app.use(express.json());

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
