const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const wordRoutes = require("./api/routes/words");
const groupRoutes = require("./api/routes/groups");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/words", wordRoutes);
app.use("/groups", groupRoutes);

app.use((req, res, next) => {
	const error = new Error("not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
