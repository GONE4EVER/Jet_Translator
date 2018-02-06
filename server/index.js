const express = require("express");
const middlewares = require("./middlewares");
const MongoClient = require("mongodb").MongoClient;

const port = 3000;
const app = express();
app.use(middlewares);

app.listen(port, () => {
	console.log(`server is running at localhost:${port}`);
});
