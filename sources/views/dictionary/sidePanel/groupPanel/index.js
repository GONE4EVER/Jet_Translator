const GROUPS_PANEL_ID = "top:dictionary:groupPanel";
const getGroupPanelId = () => GROUPS_PANEL_ID;

const groupPanel = {
	id: getGroupPanelId(),
	view: "form",
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
					value: "Add New",
					type: "form",
					click() {

					}
				}
			]
		},

		{view: "button",
			value: "Delete",
			type: "danger",
			click() {

			}
		}
	],
	rules: {

	}
};

export default groupPanel;
export {
	getGroupPanelId
};
