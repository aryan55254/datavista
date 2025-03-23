// controllers/scrapeController.js
const axios = require("axios");
const cheerio = require("cheerio");

exports.scrapeWebsite = async (req, res) => {
  try {
    const { url, items } = req.body; // items is an array, e.g. ["links", "images", "videos"]
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }
    // Fetch website HTML
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    let result = {};

    if (items.includes("links")) {
      result.links = [];
      $("a").each((i, el) => {
        const href = $(el).attr("href");
        if (href) result.links.push(href);
      });
    }
    if (items.includes("images")) {
      result.images = [];
      $("img").each((i, el) => {
        const src = $(el).attr("src");
        if (src) result.images.push(src);
      });
    }
    if (items.includes("videos")) {
      result.videos = [];
      // Get <video> tags
      $("video").each((i, el) => {
        const src = $(el).attr("src");
        if (src) result.videos.push(src);
      });
      // Also get iframes that embed YouTube/Vimeo videos
      $("iframe").each((i, el) => {
        const src = $(el).attr("src");
        if (src && (src.includes("youtube") || src.includes("vimeo"))) {
          result.videos.push(src);
        }
      });
    }

    return res.json({ message: "Scrape successful", data: result });
  } catch (error) {
    console.error("Scrape error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
