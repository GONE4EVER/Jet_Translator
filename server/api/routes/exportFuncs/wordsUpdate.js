const Word = require("../../models/word");

function addTranslation(id, translation, req, res) {
	return Word.update({_id: id}, {$push: {translation}})
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

function updateData(id, updateOps, req, res) {
	return Word.update({_id: id}, {$set: updateOps})
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

function removeTranslation(id, translation, req, res) {
	return 	Word.update({_id: id}, {$pull: {translation}})
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

module.exports.addTranslation = addTranslation;
module.exports.updateData = updateData;
module.exports.removeTranslation = removeTranslation;
