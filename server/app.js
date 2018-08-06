const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const _ = require("lodash");

const app = express();
const groupRoutes = require("./api/routes/groups");
const wordRoutes = require("./api/routes/words");

mongoose.connect(`mongodb://jet-translator:${process.env.MONGODB_ATLAS_PASSWORD}@jet-translator-shard-00-00-xizbr.mongodb.net:27017,jet-translator-shard-00-01-xizbr.mongodb.net:27017,jet-translator-shard-00-02-xizbr.mongodb.net:27017/test?ssl=true&replicaSet=jet-translator-shard-0&authSource=admin`);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("etag", "strong");

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"X-Requested-With, Content-Type, Accept, If-Modified-Since, ETag, Cache-Control"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS");
	// res.header("Cache-Control", `max-age=${process.env.MAX_AGE}`);

	res.type("json");

	next();
});

app.use("/api/groups", groupRoutes);
app.use("/api/words", wordRoutes);

app.use((req, res) => res.status(500));

module.exports = app;
