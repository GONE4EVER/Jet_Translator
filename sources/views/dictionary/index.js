import {JetView} from "webix-jet";
import {getAllWords} from "../../models/words";
import {getAllGroups} from "../../models/groups";
import layout, {getGroupListId, getFullContentListId} from "./mainPanel";
import {getWordsComboId} from "./sidePanel/groupPanel";

export default class DictionatyTopView extends JetView {
	config() {
		return layout;
	}
	init() {
		/* let promises = [getAllWords(), getAllGroups()];
		Promise.all(promises)
			.then(([words, groups]) => {
				this.config.data = {words, groups};
				$$(getFullContentListId()).parse(words.json().content);
				$$(getGroupListId()).parse(groups.json().content);
			}); */
	}
	ready() {
		let promises = [getAllWords(), getAllGroups()];
		Promise.all(promises)
			.then(([words, groups]) => {
				this.config.data = {words, groups};
				$$(getFullContentListId()).parse(words.json().content);
				$$(getWordsComboId()).getList().parse(words.json().content);

				$$(getGroupListId()).parse(groups.json().content);
			});
	}
}
