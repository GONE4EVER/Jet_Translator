import {updateWord} from "../../../models/words";

const wordPanel = {
	view: "form",
	id: "wordPanel",
	minWidth: 200,
	elements: [
		{view: "template", template: "Word info", type: "section"},
		{name: "value", id: "value", view: "text", label: "Value", labelWidth: 110, invalidMessage: "the field is empty", bottomPadding: 5},
		{name: "translation", id: "translation", view: "text", label: "Translation", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 5},
		{name: "partOfSpeech", id: "partOfSpeech", view: "text", label: "Part of speech", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 5},
		{name: "group", id: "group", view: "text", label: "Group", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 15},
		{},
		{
			cols: [
				{view: "button",
					value: "Update",
					click() {
						let data = $$("wordPanel").getValues();
						let updateOps = [];

						for (let key in data) {
							if (key.indexOf("id") === -1) {
								updateOps.push({property: key, value: data[key]});
							}
						}
						updateWord(data._id, updateOps);
					}
				},
				{view: "button",
					value: "Clear",
					click() {
						$$("wordPanel").clear();
					}
				},
				{view: "button",
					value: "Delete",
					type: "danger",
					click() {

					}
				}
			]
		},
		{view: "button",
			value: "Add New",
			type: "form",
			click() {

			}
		}
	],
	rules: {

	}
};

export default wordPanel;
