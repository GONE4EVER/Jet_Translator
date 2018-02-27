const express = require("express");
const mongoose = require("mongoose");
const Word = require("../models/word");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getCertain);
router.post("/", add);
router.patch("/:id", update);
router.delete("/:id", remove);


function getAll(req, res) {
	Word.find()
		.then((items) => {
			res.status(200).json(items);
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}


function getCertain(req, res) {
	const id = req.params.id;

	Word.findById(id)
		.then((elem) => {
			if (elem) {
				res.status(200).json(elem);
			}
			else {
				res.status(404).json({
					message: "No valid entries found for provided ID"
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}


function add(req, res) {
	if (!req.body) return res.sendStatus(400);

	const word = new Word({
		_id: mongoose.Types.ObjectId(),
		value: req.body.value,
		translation: req.body.translation,
		partOfSpeech: req.body.partOfSpeech
	});

	return word.save()
		.then(result => res.status(201).json({
			message: "Added successfully",
			value: result
		}))
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}


function update(req, res) {
	if (!req.body) return res.sendStatus(400);
	if (!req.body.length) return res.sendStatus(400);

	const id = req.params.id;
	const updateOps = {};

	for (let ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}

	Word.update({_id: id}, {$set: updateOps})
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}


function remove(req, res) {
	const id = req.params.id;

	Word.remove({_id: id})
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
}


module.exports = router;
