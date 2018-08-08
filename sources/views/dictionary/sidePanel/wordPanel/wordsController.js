import DAO from "../../../../models/wordsDAO";
import createNotifier from "../../../helpers/notifier";

function getWordsList() {
	return DAO.getAllWords();
}

function addNewWord(data) {
	delete data.id;
	delete data._id;

	return DAO.addNewWord(data);
}

function updateWord(data) {
	delete data.id;

	let updateOps = [];

	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			updateOps.push({property: key, value: data[key]});
		}
	}

	return DAO.updateWord(data._id, updateOps).then(res => res.json());
}

function deleteWord(id) {
	return DAO.deleteWord(id);
}

function removeTranslation(id, value) {
	const options = [
		{
			property: "deleteFlag",
			value: "true"
		},
		{
			property: "translation",
			value: `${value}`
		}
	];

	return DAO.removeTranslation(id, options);
}

export {
	addNewWord,
	deleteWord,
	getWordsList,
	removeTranslation,
	updateWord

};
