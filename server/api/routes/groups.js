const express = require("express");
const mongoose = require("mongoose");
const Group = require("../models/group");
const updater = require("./exportFuncs/groupsUpdate");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getCertain);
router.post("/", add);
router.patch("/:id", update);
router.delete("/:id", remove);


function getAll(req, res) {
	Group.find()
		.select("_id name created words")
		.populate([{path: "words", model: "Word", select: "_id value translation partOfSpeech"}])
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
		.populate([{path: "words", model: "Word", select: "_id value translation partOfSpeech"}])
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


function update(req, res) {
	if (!req.body) return res.sendStatus(400);
	if (!req.body.name && !req.body.word) return res.sendStatus(400);

	const id = req.params.id;

	if (req.body.name) {
		updater.changeGroupName(id, req, res);
	}
	else if (!req.body.deleteFlag) {
		updater.addItem(id, req, res);
	}
	else {
		updater.removeItem(id, req, res);
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
