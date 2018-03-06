import {JetView} from "webix-jet";
import {getGroupContent} from "../models/groups";

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
		this.on(this.app, "onGroupContentRequest", (handler, groupId) => {
			getGroupContent(groupId)
				.then(res => res.json().content.words.map(
					word => word))
				.then((arr) => {
					$$("groupContent").clearAll();
					$$("groupContent").parse(arr);
				})
				.catch(err => console.log(err));
		});
	}
	logOut() {
		this.show("/unlogged/unlogged.logIn");
	}
}
