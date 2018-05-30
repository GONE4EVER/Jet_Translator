const mongoose = require("mongoose");
const Group = require("../../models/group");

function add(req, res) {
	if (!req.body) return res.status(400);
	let date = new Date();

	const group = new Group({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		created: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
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

module.exports = add;
