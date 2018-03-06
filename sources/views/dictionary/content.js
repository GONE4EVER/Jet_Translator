import sidePanel from "./sidePanel/index";

const all = {
	id: "allList",
	view: "list",
	maxWidth: 450,
	select: true,
	template: "#value# (#partOfSpeech#)",
	on: {
		onAfterSelect(id) {
			$$("groupContent").unselectAll();
			$$("groupList").unselectAll();
			this.$scope.app.callEvent("onSelect", [this, $$("wordPanel"), id, $$("groupPanel")]);
		}
	}
};

const groups = {
	id: "groupList",
	view: "list",
	maxWidth: 450,
	select: true,
	template: "#name# (#created#)",
	on: {
		onAfterSelect(id) {
			this.$scope.app.callEvent("onGroupContentRequest", [this, id]);
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
				groups
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
