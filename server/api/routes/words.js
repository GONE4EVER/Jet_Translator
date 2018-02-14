const express = require("express");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getCertain);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);


function getAll(req, res) {
	res.status(200).json({
		message: "handling GET request to /words"
	});
}


function getCertain(req, res) {
	if (true) { // check if item with incoming id exists
		return res.sendStatus(400);
	}
	console.log(req.body);
	return res.status(200).json({
		message: "handling GET request to /words:id"
	});
}


function add(req, res) {
	if (!req.body) {
		return res.sendStatus(400);
	}
	console.log(req.body);
	return res.status(201).json({
		message: "handling POST request to /words"
	});
}


function update(req, res) {
	if (!req.body) {
		return res.sendStatus(400);
	}
	console.log(req.body);
	return res.status(200).json({
		message: "handling PUT request to /words:id"
	});
}


function remove(req, res) {
	return res.status(200).json({
		message: "Deleted"
	});
}

module.exports = router;
