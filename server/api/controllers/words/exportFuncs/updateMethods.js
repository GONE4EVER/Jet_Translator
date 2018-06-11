const Word = require("../../../models/word");

function addTranslation(id, translation) {
	return Word.update(
		{_id: id},
		{$push: {translation}}
	)
		.exec()
		.then(result => result)
		.catch(err => Promise.reject(err));
}

function updateData(id, updateOps) {
	return Word.update(
		{_id: id},
		{$set: updateOps}
	)
		.exec()
		.then(result => result)
		.catch(err => Promise.reject(err));
}

function removeTranslation(id, translation) {
	return 	Word.update(
		{_id: id},
		{$pull: {translation}}
	)
		.exec()
		.then(result => result)
		.catch(err => Promise.reject(err));
}

module.exports.addTranslation = addTranslation;
module.exports.updateData = updateData;
module.exports.removeTranslation = removeTranslation;
