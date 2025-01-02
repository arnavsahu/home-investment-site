const express = require("express");
const cors = require("cors");
const homeRouter = require("../routes/homeRouter.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", homeRouter);

module.exports = app;
