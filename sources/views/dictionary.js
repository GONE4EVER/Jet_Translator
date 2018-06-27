import {JetView} from "webix-jet";
import {getAllWords} from "../models/words";
import {getAllGroups} from "../models/groups";
import layout, {getGroupListId, getFullContentListId} from "./dictionary/content";

export default class DictionatyTopView extends JetView {
	config() {
		return layout;
	}
	init() {
		let promises = [getAllWords(), getAllGroups()];
		Promise.all(promises)
			.then((res) => {
				$$(getFullContentListId()).parse(res[0].json().content);
				$$(getGroupListId()).parse(res[1].json().content);
			});
	}
}
