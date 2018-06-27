import sidePanel from "./sidePanel/index";
import {deleteWord, getAllWords} from "../../models/words";
import {getGroupPanelId} from "./sidePanel/groupPanel";
import {getGroupContentRequestEventId} from "../top";

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
	template: "#value# (#partOfSpeech#)<span class = 'webix_icon fa-close'></span>",
	onClick: {
		"fa-close": (ev, id) => {
			webix.confirm({
				text: "Item data will be lost. <br/> Are you sure?",
				ok: "Yes",
				cancel: "Cancel",
				callback: (ok) => {
					if (ok) {
						let item = $$(getFullContentListId()).getItem(id);
						deleteWord(item._id)
							.then((res) => {
								webix.message({text: res.json().message});
								$$(getFullContentListId()).remove(item._id);
								getAllWords().then((response) => {
									$$(getFullContentListId()).clearAll();
									$$(getFullContentListId()).parse(response.json().content);
								});
							})
							.catch((err) => {
								webix.message({text: err});
							});
					}
				}
			});
		}
	},
	on: {
		onAfterSelect(id) {
			$$(getGroupContentId()).unselectAll();
			this.$scope.app.callEvent("onSelect", [this, $$("wordPanel"), id, $$(getGroupPanelId())]);
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
				.callEvent(getGroupContentRequestEventId(), [this, $$(getGroupContentId()), id]);
			this.$scope.app
				.callEvent("onSelect", [this, $$(getGroupPanelId()), id, $$("wordPanel")]);
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
			this.$scope.app.callEvent("onSelect", [this, $$("wordPanel"), id]);
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
