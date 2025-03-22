// controllers/dataController.js
const fs = require("fs");
const { parse } = require("csv-parse"); // <-- Correct import

exports.analyzeData = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = req.file.path;
  const rows = [];

  fs.createReadStream(filePath)
    .pipe(parse({ columns: true, trim: true }))
    .on("data", (row) => {
      rows.push(row);
    })
    .on("end", () => {
      const numRows = rows.length;
      const numColumns = numRows > 0 ? Object.keys(rows[0]).length : 0;

      // Optionally delete the file if you don't need it anymore
      fs.unlinkSync(filePath);

      res.json({
        numRows,
        numColumns,
        message: "Data analyzed successfully",
      });
    })
    .on("error", (error) => {
      console.error("CSV parse error:", error);
      res.status(500).json({ message: error.message });
    });
};
