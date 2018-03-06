import {JetView} from "webix-jet";
import groupPanel from "./groupPanel";
import wordPanel from "./wordPanel";


export default class SidePanel extends JetView {
	config() {
		return {
			rows: [
				wordPanel,
				groupPanel
			]
		};
	}
	init() {

	}
}
