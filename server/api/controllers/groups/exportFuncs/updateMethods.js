const Group = require("../../../models/group");
const Word = require("../../../models/word");

function changeGroupName(id, req) {
	return Group.update(
		{_id: id},
		{$set: {name: req.body.name}}
	)
		.exec()
		.then(result => result)
		.catch(err => Promise.reject(err));
}

function addItem(id, req) {
	Word.findById(req.body.word)
		.exec()
		.then(() => {})
		.catch(() => {

		});

	return	Group.update(
		{_id: id},
		{$push: {words: req.body.word}}
	)
		.exec()
		.then(result => result)
		.catch(err => Promise.reject(err));
}

function removeItem(id, req) {
	return Group.update(
		{_id: id},
		{$pull: {words: req.body.word}}
	)
		.exec()
		.then(result => result)
		.catch(err => Promise.reject(err));
}

module.exports.addItem = addItem;
module.exports.changeGroupName = changeGroupName;
module.exports.removeItem = removeItem;
