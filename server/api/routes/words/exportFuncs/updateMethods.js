const Word = require("../../../models/word");

function addTranslation(id, translation) {
	return Word.update(
		{_id: id},
		{$push: {translation}}
	)
		.then(result => ({
			...result,
			ifModified: result.nModified
		}))
		.catch(err => Promise.reject(err));
}

function updateData(id, updateOps) {
	return Word.update(
		{_id: id},
		{$set: updateOps}
	)
		.then(result => ({
			...result,
			ifModified: result.nModified
		}))
		.catch(err => Promise.reject(err));
}

function removeTranslation(id, translation) {
	return 	Word.update(
		{_id: id},
		{$pull: {translation}}
	)
		.then(result => ({
			...result,
			ifModified: result.nModified
		}))
		.catch(err => Promise.reject(err));
}

module.exports.addTranslation = addTranslation;
module.exports.updateData = updateData;
module.exports.removeTranslation = removeTranslation;
