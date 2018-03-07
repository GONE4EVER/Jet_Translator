const express = require("express");
const mongoose = require("mongoose");
const Word = require("../models/word");
const updater = require("./exportFuncs/wordsUpdate");
const _ = require("lodash");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getCertain);
router.post("/", add);
router.patch("/:id", update);
router.delete("/:id", remove);


function getAll(req, res) {
	Word.find()
		.select("_id value translation partOfSpeech")
		.then((result) => {
			const response = {
				content: result.map(item => ({
					_id: item._id,
					value: item.value,
					partOfSpeech: item.partOfSpeech,
					translation: item.translation
				}))
			};
			res.status(200).json({
				count: result.length,
				req: {
					type: "GET",
					url: `${req.baseUrl}`
				},
				...response
			});
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
		.select("_id value translation partOfSpeech")
		.then((result) => {
			if (result) {
				res.status(200).json({
					content: result,
					request: {
						type: "GET",
						url: `${req.baseUrl}/${id}`
					}
				});
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
			value: {
				_id: result._id,
				value: result.value,
				translation: result.translation,
				partOfSpeech: result.partOfSpeech,
				request: {
					type: "POST",
					url: `${req.baseUrl}`
				}
			}
		}))
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}


function update(req, res, next) {
	if (!req.body) return res.sendStatus(400);
	if (!req.body.length) return res.sendStatus(400);

	const id = req.params.id;
	const updateOps = {};

	for (let ops of req.body) {
		if (ops.value) {
			updateOps[ops.property] = ops.value;
		}
	}
	if (updateOps.translation && !updateOps.deleteFlag) {
		updater.addTranslation(id, updateOps.translation, req, res);
	}
	else if (!_.isEmpty(updateOps) && !updateOps.deleteFlag) {
		updater.updateData(id, updateOps, req, res);
	}
	else if (!_.isEmpty(updateOps) && updateOps.deleteFlag) {
		updater.removeTranslation(id, updateOps.translation, req, res);
	}
	else {
		res.sendStatus(400);
		next();
	}
}


function remove(req, res) {
	const id = req.params.id;

	Word.remove({_id: id})
		.then((result) => {
			res.status(200).json({
				message: result.n === 1 ? "Deleted successfully" : "Item doesn`t exist",
				request: {
					type: "DELETE",
					url: `${req.baseUrl}/${id}`,
					data: result
				}
			});
		})
		.catch((err) => {
			res.status(500).json(err);
		});
}


module.exports = router;
