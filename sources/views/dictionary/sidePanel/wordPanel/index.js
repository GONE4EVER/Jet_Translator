import {update, removeTranslation} from "./functions";

const WORD_PANEL_ID = "top:dictionary:wordPanel";

const getWordPanelId = () => WORD_PANEL_ID;

const wordPanel = {
	id: getWordPanelId(),
	view: "form",
	minWidth: 200,
	elements: [
		{view: "template", template: "Word info", type: "section"},
		{name: "value", id: "value", view: "text", label: "Value", labelWidth: 110, invalidMessage: "the field is empty", bottomPadding: 5},
		{
			name: "translation",
			id: "translation",
			view: "list",
			label: "Translation",
			labelWidth: 110,
			invalidMessage: "invalid value",
			bottomPadding: 5
		},
		{name: "partOfSpeech", id: "partOfSpeech", view: "text", label: "Part of speech", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 15},
		{},
		{
			cols: [
				{
					view: "button",
					value: "Update",
					click: update
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
						console.log(this.getParentView().getValues());
						/* webix.ajax()
							.post("http://localhost:3000/api/words/", $$(getWordPanelId()).getValues())
							.then(() => {})
							.catch(() => {}); */
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
