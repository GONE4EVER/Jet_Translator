const all = require("./all.js");
const express = require("express");

const app = express();
app.use(all);

module.exports = app;
