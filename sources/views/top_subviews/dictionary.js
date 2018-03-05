import {JetView} from "webix-jet";
import sidePanel from "./dictionary/sidePanel";

export default class DictionatyTopView extends JetView {
	config() {
		const all = {
			id: "allList",
			view: "list"
		};

		const groups = {
			id: "groupList",
			view: "list"
		};

		const groupContent = {
			id: "groupContent",
			view: "list"
		};

		const layout = {
			cols: [
				all, groups, groupContent, sidePanel
			]
		};
		return layout;
	}
}
