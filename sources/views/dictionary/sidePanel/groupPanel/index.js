import {toolbar} from "./toolbarConfig";

const GROUPS_PANEL_ID = "top:dictionary:groupPanel";
const GROUP_CONTENT_CONTAINER_ID = "top:dictionary:groupContentContainer";
const WORDS_CONTAINER_ID = "top:dictionary:ContainerId";

const getGroupPanelId = () => GROUPS_PANEL_ID;
const getGroupContentContainerId = () => GROUP_CONTENT_CONTAINER_ID;
const getRestWordsContainerId = () => WORDS_CONTAINER_ID;


const groupContentContainer = {
	id: getGroupContentContainerId(),
	view: "multicombo",
	label: "Group content",
	labelWidth: 110,
	bottomPadding: 20,
	options: []
};

const wordsList = {
	id: getRestWordsContainerId(),
	view: "multicombo",
	label: "Add word",
	labelWidth: 110,
	bottomPadding: 20,
	options: []
};

const tabs = {
	view: "tabview",
	height: 120,
	cells: [
		{
			header: "All words",
			body: wordsList
		},
		{
			header: "Group content",
			body: groupContentContainer
		}
	]
};


const groupPanel = {
	id: getGroupPanelId(),
	view: "form",
	minWidth: 200,
	elements: [
		{view: "template", template: "Group info", type: "section"},
		{name: "name", id: "name", view: "text", label: "Name", labelWidth: 110, invalidMessage: "the field is empty", bottomPadding: 5},
		{name: "created", id: "created", view: "text", label: "Created at", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 15},
		...tabs,
		toolbar,
		{}
	],
	rules: {

	}
};

export default groupPanel;
export {
	getGroupPanelId,
	getGroupContentContainerId,
	getRestWordsContainerId
};
