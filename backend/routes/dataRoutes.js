const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const { analyzeData } = require("../controllers/dataController");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure this folder exists or add code to create it
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/upload", authMiddleware, upload.single("datafile"), analyzeData);

module.exports = router;
