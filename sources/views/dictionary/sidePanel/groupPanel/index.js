import {toolbar} from "./toolbarConfig";

const GROUPS_PANEL_ID = "top:dictionary:groupPanel";
const WORDS_COMBO_ID = "top:dictionary:wordsCombo";

const getGroupPanelId = () => GROUPS_PANEL_ID;
const getWordsComboId = () => WORDS_COMBO_ID;


const form = [
	{
		rows: [
			{
				id: getWordsComboId(),
				view: "combo",
				label: "Add word",
				labelWidth: 110,
				bottomPadding: 20,
				options: []
			},
			toolbar
		]

	},
	{}
];


const groupPanel = {
	id: getGroupPanelId(),
	view: "form",
	minWidth: 200,
	elements: [
		{view: "template", template: "Group info", type: "section"},
		{name: "name", id: "name", view: "text", label: "Name", labelWidth: 110, invalidMessage: "the field is empty", bottomPadding: 5},
		{name: "created", id: "created", view: "text", label: "Created at", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 15},
		...form

	],
	rules: {

	}
};

export default groupPanel;
export {
	getGroupPanelId,
	getWordsComboId
};
