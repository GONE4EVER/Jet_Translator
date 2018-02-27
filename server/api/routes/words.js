const express = require("express");
const mongoose = require("mongoose");
const Word = require("../models/word");

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

	return res.status(200).json({
		message: "handling GET request to /words:id"
	});
}


function add(req, res) {
	if (!req.body) return res.sendStatus(400);


	const word = new Word({
		_id: mongoose.Types.ObjectId(),
		value: req.body.value || "",
		translation: req.body.translation || "",
		partOfSpeech: req.body.partOfSpeech || ""
	});

	return word.save()
		.then(result => res.status(201).json({
			message: "Added successfully",
			value: result
		}))
		.catch(() => {

		});
	// get last user id in database
	// like /****let id = users.length ? Math.max(...users.map(o => o.id)) + 1 : 1****/
}


function update(req, res) {
	if (!req.body) {
		return res.sendStatus(400);
	}
	const id = req.params.id;

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
