import {JetView} from "webix-jet";
import {getAllWords} from "../models/words";
import {getAllGroups} from "../models/groups";
import layout from "./dictionary/content";

export default class DictionatyTopView extends JetView {
	config() {
		return layout;
	}
	init() {
		getAllWords().then((res) => {
			$$("allList").parse(res.json().content);
		});
		getAllGroups().then((res) => {
			const data = res.json().content;
			$$("groupList").parse(data);
		});
	}
}
