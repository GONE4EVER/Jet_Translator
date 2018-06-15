import {JetView} from "webix-jet";
import {getAllWords} from "../models/words";
import {getAllGroups} from "../models/groups";
import layout from "./dictionary/content";

export default class DictionatyTopView extends JetView {
	config() {
		return layout;
	}
	init() {
		let promises = [getAllWords(), getAllGroups()];
		Promise.all(promises)
			.then((res) => {
				$$("allList").parse(res[0].json().content);
				$$("groupList").parse(res[1].json().content);
			});
	}
}
