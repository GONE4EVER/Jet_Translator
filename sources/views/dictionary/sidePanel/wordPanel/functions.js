import {updateWord} from "../../../../models/words";
import {getWordPanelId} from ".";


function update() {
	let data = $$(getWordPanelId()).getValues();
	let updateOps = [];

	for (let key in data) {
		if (key.indexOf("id") === -1) {
			updateOps.push({property: key, value: data[key]});
		}
	}

	updateWord(data._id, updateOps)
		.then((res) => {
			webix.message({text: res.json().message});
		});
}

function removeTranslation() {
	const data = [{
		deleteFlag: "true",
		translation: `${$$("translation").getValue()}`
	}];
	// deleteTranslation()
	console.log(data);
}

export {
	update,
	removeTranslation
};
