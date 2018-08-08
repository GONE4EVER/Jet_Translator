import {getByOccurances} from "./functions";

const GROUPS_PANEL_ID = "top:dictionary:groupPanel";
const WORDS_COMBO_ID = "top:dictionary:wordsCombo";

const getGroupPanelId = () => GROUPS_PANEL_ID;
const getWordsComboId = () => WORDS_COMBO_ID;

const combo = {
	id: getWordsComboId(),
	view: "combo",
	label: "Add word",
	labelWidth: 110,
	bottomPadding: 20,
	options: [],
	on: {
		onTimedKeyPress() {
			let word = getByOccurances(this.getValue());
			this.define({options: word});
			this.refresh();
		},
		onAfterRender() {
			this.getList().parse();
		}
	}
};

const toolbar = [
	{
		rows: [
			combo,
			{
				css: {
					display: "flex",
					"flex-direction": "row",
					"justify-content": "space-around",
					"align-items": "center"
				},
				cols: [
					{
						view: "icon",
						icon: "edit",
						tooltip: "Edit selected",
						on: {

						}
					},
					{
						view: "icon",
						icon: "paint-brush ",
						tooltip: "Clear form",
						on: {

						}
					},
					{
						view: "icon",
						icon: "plus",
						tooltip: "Add this word to the database",
						on: {

						}
					},
					{
						view: "icon",
						icon: "trash",
						tooltip: "Delete selected",
						on: {

						}
					}
				]
			}
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
		...toolbar
	],
	rules: {

	}
};

export default groupPanel;
export {
	getGroupPanelId,
	getWordsComboId
};
