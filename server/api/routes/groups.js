const express = require("express");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getCertain);
router.post("/", add);
router.put("/:id", update);


function getAll(req, res) {
	return res.status(200).json({
		message: "handling GET request to the route /groups"
	});
}


function getCertain(req, res) {
	return res.status(200).json({
		message: "handling GET request to the route /groups:id"
	});
}


function add(req, res) {
	return res.status(201).json({
		message: "handling POST request to the route /groups"
	});
}


function update(req, res) {
	return res.status(200).json({
		message: "handling PUT request to the route /groups:id"
	});
}

module.exports = router;
