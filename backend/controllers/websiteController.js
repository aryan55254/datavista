// controllers/websiteController.js
const axios = require("axios");
const cheerio = require("cheerio");

exports.analyzeWebsite = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ message: "No URL provided" });
    }

    // Fetch the website HTML
    const response = await axios.get(url);
    const html = response.data;

    // Load HTML into Cheerio
    const $ = cheerio.load(html);

    // Extract some basic info
    const title = $("head title").text();
    const metaDescription = $('meta[name="description"]').attr("content") || "";
    const h1Text = $("h1").first().text();
    const headingsCount = {
      h1: $("h1").length,
      h2: $("h2").length,
      h3: $("h3").length,
    };

    // You can add more extraction logic as needed

    res.json({
      message: "Website analyzed successfully",
      url,
      title,
      metaDescription,
      h1Text,
      headingsCount,
    });
  } catch (error) {
    console.error("Website analysis error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
