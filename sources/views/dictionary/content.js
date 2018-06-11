import sidePanel from "./sidePanel/index";
import {deleteWord, getAllWords} from "../../models/words";

const all = {
	id: "allList",
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
						let item = $$("allList").getItem(id);
						deleteWord(item._id)
							.then((res) => {
								webix.message({text: res.json().message});
								$$("allList").remove(item._id);
								getAllWords().then((response) => {
									$$("allList").clearAll();
									$$("allList").parse(response.json().content);
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
			$$("groupContent").unselectAll();
			this.$scope.app.callEvent("onSelect", [this, $$("wordPanel"), id, $$("groupPanel")]);
		}
	}
};

const groupsList = {
	id: "groupList",
	view: "list",
	maxWidth: 450,
	select: true,
	template: "#name# (#created#)",
	on: {
		onAfterSelect(id) {
			this.$scope.app.callEvent("onGroupContentRequest", [this, $$("groupContent"), id]);
			this.$scope.app.callEvent("onSelect", [this, $$("groupPanel"), id, $$("wordPanel")]);
		}
	}
};

const groupContent = {
	id: "groupContent",
	view: "list",
	maxWidth: 450,
	select: true,
	template: "#value# (#partOfSpeech#)",
	on: {
		onAfterSelect(id) {
			$$("allList").unselectAll();
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
						{view: "template", id: "groupContentHeaderTemplate", template: "", type: "header", borderless: "true"}
					]
				},
				groupContent
			]
		},
		sidePanel
	]
};

export default layout;
