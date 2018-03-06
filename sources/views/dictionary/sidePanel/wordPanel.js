const wordPanel = {
	view: "form",
	id: "wordPanel",
	minWidth: 200,
	elements: [
		{view: "template", template: "Word info", type: "section"},
		{name: "value", id: "value", view: "text", label: "Value", labelWidth: 100, invalidMessage: "the field is empty", bottomPadding: 5},
		{name: "translation", id: "translation", view: "text", label: "Translation", labelWidth: 100, invalidMessage: "invalid value", bottomPadding: 5},
		{name: "partOfSpeech", id: "partOfSpeech", view: "text", label: "Part of speech", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 5},
		{name: "group", id: "group", view: "text", label: "Group", labelWidth: 100, invalidMessage: "invalid value", bottomPadding: 15},
		{
			cols: [
				{view: "button",
					value: "Add New",
					type: "form",
					click() {

					}
				},
				{view: "button",
					value: "Update",
					type: "form",
					click() {

					}
				},
				{view: "button",
					value: "Clear",
					click() {

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
		{}
	],
	rules: {

	}
};

export default wordPanel;
