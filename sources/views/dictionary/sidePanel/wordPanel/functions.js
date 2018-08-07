import {addNewWord, updateWord, deleteTranslation} from "../../../../models/words";

export function addWord(data) {
	delete data.id;
	delete data._id;

	return addNewWord(data);
}

function update(data) {
	delete data.id;

	let updateOps = [];

	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			updateOps.push({property: key, value: data[key]});
		}
	}

	updateWord(data._id, updateOps)
		.then((res) => {
			webix.message({text: res.json().message});
		});
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

	return deleteTranslation(id, options);
}

export {
	update,
	removeTranslation
};
