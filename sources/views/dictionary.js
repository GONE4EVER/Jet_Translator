import {JetView} from "webix-jet";
import sidePanel from "./dictionary/sidePanel/index";
import words from "../models/words";

export default class DictionatyTopView extends JetView {
	config() {
		const all = {
			id: "allList",
			view: "list",
			maxWidth: 450
		};

		const groups = {
			id: "groupList",
			view: "list",
			maxWidth: 450
		};

		const groupContent = {
			id: "groupContent",
			view: "list",
			maxWidth: 450
		};

		const layout = {
			cols: [
				all, groups, groupContent, sidePanel
			]
		};
		return layout;
	}
	init() {
		const allList = $$("allList");
		allList.parse(words);
	}
}
