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
		.select("_id name")
		.then()
		.catch();
	return res.status(200).json({
		message: "handling GET request to the route /groups"
	});
}


function getCertain(req, res) {
	const id = req.params.id;
	const group = Group.findById(id).then(item => item);

	Word.find({groupId: id})
		.select("_id value translation partOfSpeech groupId")
		.then((result) => {
			const response = {
				count: result.length,
				name: group.name,
				content: result
			};

			res.status(200).json({
				request: {
					type: "GET",
					url: `${req.baseUrl}/${id}`
				},
				...response
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});

	return res.status(200).json({
		message: "handling GET request to the route /groups:id"
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
	if (!req.body.length) return res.sendStatus(400);

	const id = req.params.id;
	Group.update({_id: id}, {$set: {name: req.body.name}})
		.then()
		.catch();
}


function onGroupRemove(id) {
	Word.find({groupId: id})
		.then((result) => {
			// const updated = result.map((item) => {
			//     let index = item.groupId.findIndex()
			//     item.groupId[]
			// })
		})
		.catch();
}

function remove(req, res) {
	const id = req.params.id;

	Group.remove({_id: id})
		.then((result) => {
			onGroupRemove(id);
			res.status({
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
