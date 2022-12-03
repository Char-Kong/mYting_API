const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const route = require("./src/routes/index");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", route);
