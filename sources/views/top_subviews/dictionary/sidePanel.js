const sidePanel = {
	view: "form",
	id: "sidePanel",
	minWidth: 200,
	gravity: 0.5,
	elements: [
		{view: "template", template: "Edit Films", type: "section"},
		{name: "title", id: "title", view: "text", label: "Title", labelWidth: 100, invalidMessage: "the field is empty"},
		{name: "year", id: "year", view: "text", label: "Year", labelWidth: 100, invalidMessage: "invalid value"},
		{name: "rating", id: "rating", view: "text", label: "Rating", labelWidth: 100, invalidMessage: "invalid value"},
		{name: "votes", id: "votes", view: "text", label: "Votes", labelWidth: 100, invalidMessage: "the field is empty"},
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

export default sidePanel;
