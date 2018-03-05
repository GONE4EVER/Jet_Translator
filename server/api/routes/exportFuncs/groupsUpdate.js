const Group = require("../../models/group");

function changeGroupName(id, req, res) {
	return 	Group.update(
		{_id: id},
		{$set: {name: req.body.name}}
	)
		.then((result) => {
			res.status(200).json({
				message: result.nModified === 1 ? "Updated successfully" : "Item is already up-to-date",
				req: {
					type: "PATCH",
					url: `${req.baseUrl}/${id}`
				}
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}

function addItem(id, req, res) {
	return 	Group.update(
		{_id: id},
		{$push: {words: req.body.word}}
	)
		.then((result) => {
			res.status(200).json({
				message: result.nModified === 1 ? "Updated successfully" : "Item is already up-to-date",
				req: {
					type: "PATCH",
					url: `${req.baseUrl}/${id}`
				}
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}

function removeItem(id, req, res) {
	return 	Group.update(
		{_id: id},
		{$pull: {words: req.body.word}}
	)
		.then((result) => {
			res.status(200).json({
				message: result.nModified === 1 ? "Updated successfully" : "Item is already up-to-date",
				req: {
					type: "PATCH",
					url: `${req.baseUrl}/${id}`
				}
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}

module.exports.addItem = addItem;
module.exports.changeGroupName = changeGroupName;
module.exports.removeItem = removeItem;
