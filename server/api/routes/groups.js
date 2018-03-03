const express = require("express");
const mongoose = require("mongoose");
const Word = require("../models/word");
const Group = require("../models/group");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getCertain);
router.post("/", add);
router.patch("/:id", update);
router.delete("/:id", remove);


function getAll(req, res) {
	Group.find()
		.select("_id name created words")
		.populate("Word", "_id value translation partOfSpeech")
		.then((result) => {
			const response = {
				content: result.map(item => ({
					id: item._id,
					name: item.name,
					created: item.created,
					words: item.words
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
	Group.findById(id)
		.select("_id name created words")
		.populate("Word", "_id value translation partOfSpeech")
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
	if (!req.body) return res.status(400);

	const group = new Group({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		created: new Date()
	});

	return group.save()
		.then(result => res.status(200).json({
			_id: result._id,
			name: result.name,
			created: result.created,
			request: {
				type: "POST",
				url: `${req.baseUrl}`
			}
		}))
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}


function changeGroupName(id, newName) {
	return 	Group.update(
		{_id: id},
		{$set: {name: newName}}
	)
		.then(() => Promise.resolve())
		.catch(() => Promise.reject());
}

function updateItems(id, word) {
	return 	Group.update(
		{_id: id},
		{$push: {words: word}}
	)
		.then(() => Promise.resolve())
		.catch(() => Promise.reject());
}

function update(request, response) {
	if (!request.body) return response.sendStatus(400);
	if (!request.body.name && !request.body.word) return response.sendStatus(400);

	const id = request.params.id;

	if (request.body.name) {
		changeGroupName(id, request.body.name)
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
		updateItems(id, request.body.word)
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

	Group.remove({_id: id})
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
