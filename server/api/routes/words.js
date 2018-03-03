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
				request: {
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
					value: result,
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


function addTranslation(id, translation) {
	return Word.update({_id: id}, {$push: {translation}})
		.then(result => Promise.resolve(result))
		.catch(err => Promise.reject(err));
}

function updateData(id, updateOps) {
	return Word.update({_id: id}, {$set: updateOps})
		.then(result => Promise.resolve(result))
		.catch(err => Promise.reject(err));
}

function update(request, response) {
	if (!request.body) return response.sendStatus(400);
	if (!request.body.length) return response.sendStatus(400);

	const id = request.params.id;
	const updateOps = {};

	for (let ops of request.body) {
		updateOps[ops.property] = ops.value;
	}

	if (updateOps.translation) {
		addTranslation(id, updateOps.translation)
			.then((result) => {
				response.status(200).json({
					message: result.nModified === 1 ? "Updated successfully" : "Item is already up-to-date",
					request: {
						type: "PATCH",
						url: `${request.baseUrl}/${id}`
					}
				});
			})
			.catch((err) => {
				response.status(500).json({
					error: err
				});
			});
	}
	else {
		updateData(id, updateOps)
			.then((result) => {
				response.status(200).json({
					message: result.nModified === 1 ? "Updated successfully" : "Item is already up-to-date",
					request: {
						type: "PATCH",
						url: `${request.baseUrl}/${id}`
					}
				});
			})
			.catch((err) => {
				response.status(500).json({
					error: err
				});
			});
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
