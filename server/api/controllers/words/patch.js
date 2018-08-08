const updater = require("./exportFuncs/updateMethods");
const _ = require("lodash");

function getPatchResult(id, updateOps, res) {
	switch (!_.isEmpty(updateOps)) {
		case true:

			if (updateOps.deleteFlag) {
				return updater.removeTranslation(id, updateOps.translation);
			}
			else if (updateOps.translation) {
				updateOps.translation = updateOps.translation.trim().split(", ");
				return updater.addTranslation(id, updateOps.translation);
			}
			else if (!updateOps.translation) {
				return updater.updateData(id, updateOps);
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
