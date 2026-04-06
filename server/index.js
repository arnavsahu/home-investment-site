const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const homeRouter = require("./routes/homeRouter");

const PORT = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());

// Serve React client build
app.use(express.static(path.join(__dirname, "../client/build")));

//ROUTES//
app.use("/", homeRouter);

// Catch-all: serve React app for any non-API route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
