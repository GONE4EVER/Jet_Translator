const updater = require("./exportFuncs/updateMethods");

function getPatchResult(id, req) {
	if (req.body.name) {
		return updater.changeGroupName(id, req);
	}
	else if (!req.body.deleteFlag) {
		return updater.addItem(id, req);
	}
	return updater.removeItem(id, req);
}

function update(req, res) {
	if (!req.body) return res.sendStatus(400);
	if (!req.body.name && !req.body.word) return res.sendStatus(400);

	const id = req.params.id;

	const result = getPatchResult(id, req);

	result
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

module.exports = update;
