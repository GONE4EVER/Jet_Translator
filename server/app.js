const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");


const app = express();
const groupRoutes = require("./api/routes/groups");
const wordRoutes = require("./api/routes/words");

mongoose.connect(
	`mongodb://jet-translator:${process.env.MONGODB_ATLAS_PASSWORD}@jet-translator-shard-00-00-xizbr.mongodb.net:27017,jet-translator-shard-00-01-xizbr.mongodb.net:27017,jet-translator-shard-00-02-xizbr.mongodb.net:27017/test?ssl=true&replicaSet=jet-translator-shard-0&authSource=admin`,
	{
		useMongoClient: true
	}
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	if (req === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
		return res.status(200).json({});
	}
	next();
});

app.use("/words", wordRoutes);
app.use("/groups", groupRoutes);

app.use((req, res, next) => {
	const error = new Error("not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
