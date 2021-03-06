const http = require("http");
const dotenvConfig = require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
	console.log(`server is running at localhost:${port}`);
});
