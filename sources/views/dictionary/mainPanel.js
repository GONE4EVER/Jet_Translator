import sidePanel from "./sidePanel/index";
import {getGroupPanelId} from "./sidePanel/groupPanel";
import {getGroupContentRequestEventId} from "../top";
import {getWordPanelId} from "./sidePanel/wordPanel/index";
import {onGroupContentSelectEventId} from "../helpers/events";

const GROUP_CONTENT_ID = "top:dictionary:groupContent";
const GROUP_CONTENT_HEADER_ID = "groupContentHeaderTemplate";
const GROUP_LIST_ID = "top:dictionary:groupList";
const FULL_CONTENT_LIST_ID = "top:dictionary:fullContentList";

const getGroupContentId = () => GROUP_CONTENT_ID;
const getGroupContentHeaderId = () => GROUP_CONTENT_HEADER_ID;
const getGroupListId = () => GROUP_LIST_ID;
const getFullContentListId = () => FULL_CONTENT_LIST_ID;


const all = {
	id: getFullContentListId(),
	view: "list",
	maxWidth: 450,
	select: true,
	template: "#value# (#partOfSpeech#)",
	on: {
		onAfterSelect(id) {
			$$(getGroupContentId()).unselectAll();
			this.$scope.app.callEvent(onGroupContentSelectEventId(),
				[this.config.id, getWordPanelId(), id, getGroupPanelId()]
			);
		}
	}
};

const groupsList = {
	id: getGroupListId(),
	view: "list",
	maxWidth: 450,
	select: true,
	template: "#name# (#created#)",
	on: {
		onAfterSelect(id) {
			this.$scope.app
				.callEvent(getGroupContentRequestEventId(),
					[this.config.id, $$(getGroupContentId()), id]
				);
			this.$scope.app
				.callEvent(onGroupContentSelectEventId(),
					[this.config.id, getGroupPanelId(), id, getWordPanelId()]
				);
		}
	}
};

const groupContent = {
	id: getGroupContentId(),
	view: "list",
	maxWidth: 450,
	select: true,
	template: "#value# (#partOfSpeech#)",
	on: {
		onAfterSelect(id) {
			$$(getFullContentListId()).unselectAll();
			this.$scope.app.callEvent(onGroupContentSelectEventId(),
				[this.config.id, getWordPanelId(), id]
			);
		}
	}
};

const layout = {
	cols: [
		{
			rows: [
				{
					view: "toolbar",
					height: 50,
					elements: [
						{template: "<div style = 'text-align: center'>All words</div>", type: "header", borderless: "true"}
					]
				},
				all
			]
		},
		{
			rows: [
				{
					view: "toolbar",
					height: 50,
					elements: [
						{template: "<div style = 'text-align: center'>All groups</div>", type: "header", borderless: "true"}
					]
				},
				groupsList
			]
		},
		{
			rows: [
				{
					view: "toolbar",
					height: 50,
					elements: [
						{view: "template", id: getGroupContentHeaderId(), template: "", type: "header", borderless: "true"}
					]
				},
				groupContent
			]
		},
		sidePanel
	]
};

export default layout;
export {
	getGroupListId,
	getGroupContentHeaderId,
	getFullContentListId
};
