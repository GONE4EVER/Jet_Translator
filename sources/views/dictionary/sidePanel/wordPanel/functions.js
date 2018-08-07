import {updateWord, deleteTranslation} from "../../../../models/words";
import {getWordPanelId, getTranslationsListId} from ".";


function update() {
	let data = $$(getWordPanelId()).getValues();
	let updateOps = [];

	for (let key in data) {
		if (key.indexOf("id") === -1 || key.indexOf("_id") === -1) {
			updateOps.push({property: key, value: data[key]});
		}
	}

	updateWord(data._id, updateOps)
		.then((res) => {
			webix.message({text: res.json().message});
		});
}

function removeTranslation(data) {
	const options = [
		{
			property: "deleteFlag",
			value: "true"
		},
		{
			property: "translation",
			value: `${$$(getTranslationsListId()).getSelectedItem().value}`
		}
	];

	deleteTranslation(data._id, options)
		.then((res) => {
			const list = this.getParentView().getParentView().queryView({view: "list"});

			list.remove(list.getSelectedId());
			list.refresh();
		})
		.catch();
}

export {
	update,
	removeTranslation
};
