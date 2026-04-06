const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const path = require("path");

const PORT = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());

// Serve React client build
app.use(express.static(path.join(__dirname, "../client/build")));

//ROUTES//

// Get homes based on some queries
app.get("/homes", (req, res) => {
  try {
    const queryParams = [];
    const conditions = [];

    const stringColumns = ["id", "address", "city", "state", "zip_code"];
    const numericalColumns = [
      "house_value",
      "estimated_rent",
      "bedrooms",
      "bathrooms",
      "square_feet",
    ];

    let query = "SELECT * FROM rentals";

    // Handle string columns
    stringColumns.forEach((column) => {
      if (req.query[column]) {
        queryParams.push(req.query[column]);
        conditions.push(`${column} = ?`);
      }
    });

    // Handle numerical columns with min, max, and exact match
    numericalColumns.forEach((column) => {
      if (req.query[`min_${column}`]) {
        queryParams.push(req.query[`min_${column}`]);
        conditions.push(`${column} >= ?`);
      }
      if (req.query[`max_${column}`]) {
        queryParams.push(req.query[`max_${column}`]);
        conditions.push(`${column} <= ?`);
      }
      if (req.query[column]) {
        queryParams.push(req.query[column]);
        conditions.push(`${column} = ?`);
      }
    });

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    db.all(query, queryParams, (err, rows) => {
      if (err) {
        console.error("Error retrieving homes:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(rows);
    });
  } catch (err) {
    console.error("Error retrieving homes:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Catch-all: serve React app for any non-API route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
