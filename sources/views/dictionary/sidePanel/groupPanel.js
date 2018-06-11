const groupPanel = {
	view: "form",
	id: "groupPanel",
	minWidth: 200,
	elements: [
		{view: "template", template: "Group info", type: "section"},
		{name: "name", id: "name", view: "text", label: "Name", labelWidth: 110, invalidMessage: "the field is empty", bottomPadding: 5},
		{name: "created", id: "created", view: "text", label: "Created at", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 15},
		{},
		{
			cols: [
				{view: "button",
					value: "Update",
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

export default groupPanel;
