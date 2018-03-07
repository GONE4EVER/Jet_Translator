import {JetView} from "webix-jet";
import {groups} from "../models/groups";

export default class TopView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const header = {
			id: "header",
			type: "header",
			template() {
				return $$("topmenu").getItem($$("topmenu").getFirstId()).value;
			}
		};

		const menu = {
			view: "menu",
			id: "topmenu",
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='webix_icon fa-#icon#'></span> #value# ",
			data: [
				{value: _("Dictionary"), id: "dictionary", icon: "briefcase"},
				{value: _("New test"), id: "test", icon: "plus-square"},
				{value: _("History"), id: "history", icon: "history"},
				{value: _("Settings"), id: "settings", icon: "cog"},
				{value: _("Exit"), id: "exit", icon: "sign-out"}
			],
			on: {
				onAfterRender() {
					this.select(this.getFirstId());
				},
				onSelectChange: () => {
					const item = $$("topmenu").getSelectedItem();
					$$("header").config.template = webix.template(item.value);
					$$("header").refresh();
				},
				onItemClick(id) {
					if (id !== "exit") {
						let item = this.getItem(id);
						this.$scope.show(`./${item.id}`);
					}
					else {
						this.$scope.logOut();
					}
				}
			}
		};


		const ui = {
			type: "line",
			cols: [
				{
					type: "clean",
					css: "app-left-panel",
					padding: 10,
					margin: 20,
					borderless: true,
					rows: [header, menu]
				},
				{
					rows: [
						{height: 10},
						{
							type: "clean",
							css: "app-right-panel",
							padding: 4,
							rows: [
								{$subview: true}
							]
						},
						{height: 5}
					]}
			]
		};
		return ui;
	}
	init() {
		this.on(this.app, "onGroupContentRequest", (sourceHandler, targetHandler, groupId) => {
			let groupName = sourceHandler.getItem(groupId).name;
			$$("groupContentHeaderTemplate").setHTML(`<div style = 'text-align: center'>${groupName}-group content</div>`);
			$$("groupContentHeaderTemplate").refresh();

			targetHandler.clearAll();
			for (let group of groups.getItem(groups.getFirstId())) {
				if (group.groupID === groupId) {
					targetHandler.parse(group.words);
					break;
				}
			}
		});

		this.on(this.app, "onSelect", (sourceHandler, targetHandler, groupId, ignoredHandler) => {
			if (ignoredHandler) {
				ignoredHandler.clear();
			}
			else if (!$$("groupPanel").getValues().name) {
				$$("groupPanel").setValues($$("groupList").getSelectedItem());
			}
			targetHandler.setValues(sourceHandler.getItem(groupId));
		});
	}
	logOut() {
		this.show("/unlogged/unlogged.logIn");
	}
}
