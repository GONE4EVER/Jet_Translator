const updater = require("./exportFuncs/updateMethods");
const _ = require("lodash");

function getPatchResult(id, updateOps, res) {
	switch (!_.isEmpty(updateOps)) {
		case true:

			if (updateOps.translation && !updateOps.deleteFlag) {
				updateOps.translation = updateOps.translation.trim().split(", ");

				console.log(updateOps.translation);
				return updater.addTranslation(id, updateOps.translation);
			}
			if (!updateOps.deleteFlag && !updateOps.translation) {
				return updater.updateData(id, updateOps);
			}
			else if (updateOps.deleteFlag) {
				return updater.removeTranslation(id, updateOps.translation);
			}
			break;
		default:
			return res.sendStatus(400);
	}
}

function update(req, res) {
	if (!req.body) return res.sendStatus(400);
	if (!req.body.length) return res.sendStatus(400);

	const id = req.params.id;
	const updateOps = {};

	for (let ops of req.body) {
		if (ops.value) {
			updateOps[ops.property] = ops.value;
		}
	}

	const patch = getPatchResult(id, updateOps, res);

	patch
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
