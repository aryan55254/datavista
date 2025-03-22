const csv = require("csv-parse");
const fs = require("fs");

exports.analyzeData = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = req.file.path;
  const rows = [];

  fs.createReadStream(filePath)
    .pipe(csv({ columns: true, trim: true }))
    .on("data", (row) => {
      rows.push(row);
    })
    .on("end", () => {
      // Example: Return the count of rows and columns
      const numRows = rows.length;
      const numColumns = numRows > 0 ? Object.keys(rows[0]).length : 0;
      // Clean up the file after processing if needed
      fs.unlinkSync(filePath);
      res.json({ numRows, numColumns, message: "Data analyzed successfully" });
    })
    .on("error", (error) => {
      res.status(500).json({ message: error.message });
    });
};
