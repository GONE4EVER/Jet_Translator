import {updateWord} from "../../../models/words";

const WORD_PANEL_ID = "top:dictionary:wordPanel";

const getWordPanelId = () => WORD_PANEL_ID;

function Update() {
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


const wordPanel = {
	id: getWordPanelId(),
	view: "form",
	minWidth: 200,
	elements: [
		{view: "template", template: "Word info", type: "section"},
		{name: "value", id: "value", view: "text", label: "Value", labelWidth: 110, invalidMessage: "the field is empty", bottomPadding: 5},
		{name: "translation", id: "translation", view: "textarea", label: "Translation", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 5},
		{name: "partOfSpeech", id: "partOfSpeech", view: "text", label: "Part of speech", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 15},
		{},
		{
			cols: [
				{
					view: "button",
					value: "Update",
					click: Update
				},
				{
					view: "button",
					value: "Clear",
					click() {
						$$(getWordPanelId()).clear();
					}
				},
				{
					view: "button",
					value: "Add New",
					type: "form",
					click() {
						webix.ajax()
							.post("http://localhost:3000/api/words/", $$(getWordPanelId()).getValues())
							.then(() => {})
							.catch(() => {});
					}
				}
			]
		},
		{
			view: "button",
			value: "Remove translation",
			type: "danger",
			click: removeTranslation
		}
	],
	rules: {

	}
};

export default wordPanel;
export {
	getWordPanelId
};
