import {JetView} from "webix-jet";
import * as Navigator from "./helpers/navigationConstants";
import {
	onGetGroupContentRequestEvent,
	onGroupContentSelectEvent,
	getGroupContentRequestEventId,
	onGroupContentSelectEventId
} from "./helpers/events";

const DICTIONARY_MENU_ID = "dictionary";
const EXIT_MENU_ID = "exit";
const HISTORY_MENU_ID = "history";
const MENU_HEADER_ID = "top:sidemenu:header";
const SETTINGS_MENU_ID = "settings";
const SIDEMENU_ID = "top:sidemenu";
const TEST_MENU_ID = "test";

const getDictionaryInMenuId = () => DICTIONARY_MENU_ID;
const getExitInMenuId = () => EXIT_MENU_ID;
const getHistoryInMenuId = () => HISTORY_MENU_ID;
const getMenuHeaderId = () => MENU_HEADER_ID;
const getTestInMenuId = () => TEST_MENU_ID;
const getSideMenuId = () => SIDEMENU_ID;
const getSettingsInMenuId = () => SETTINGS_MENU_ID;


export default class TopView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const header = {
			id: getMenuHeaderId(),
			type: "header",
			template() {
				const menu = $$(getSideMenuId());

				return menu.getItem(menu.getFirstId()).value;
			}
		};

		const menu = {
			view: "menu",
			id: getSideMenuId(),
			width: 180,
			layout: "y",
			select: true,
			template: "<span class='webix_icon fa-#icon#'></span> #value# ",
			data: [
				{value: _("Dictionary"), id: getDictionaryInMenuId(), icon: "briefcase"},
				{value: _("New test"), id: getTestInMenuId(), icon: "plus-square"},
				{value: _("History"), id: getHistoryInMenuId(), icon: "history"},
				{value: _("Settings"), id: getSettingsInMenuId(), icon: "cog"},
				{value: _("Exit"), id: getExitInMenuId(), icon: "sign-out"}
			],
			on: {
				onAfterRender() {
					this.select(this.getFirstId());
				},
				onSelectChange() {
					const item = this.getSelectedItem();

					$$(getMenuHeaderId()).config.template = webix.template(item.value);
					$$(getMenuHeaderId()).refresh();
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
		this.on(this.app, getGroupContentRequestEventId(), onGetGroupContentRequestEvent);
		this.on(this.app, onGroupContentSelectEventId(), onGroupContentSelectEvent);
		// this.on(this.app, )
	}
	logOut() {
		this.show(`/unlogged/${Navigator.getSignInUrl()}`);
	}
}

export {
	getGroupContentRequestEventId
};
