import {JetView} from "webix-jet";

import {getAllGroups} from "../../models/groups";
import {getWordsComboId} from "./sidePanel/groupPanel";
import * as WordsController from "./sidePanel/wordPanel/wordsController";
import layout, {getGroupListId, getFullContentListId} from "./mainPanel";


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
		let promises = [WordsController.getWordsList(), getAllGroups()];

		Promise.all(promises)
			.then(([words, groups]) => {
				this.config.data = {words, groups};
				$$(getFullContentListId()).parse(words.json().content);
				$$(getWordsComboId()).getList().parse(words.json().content);

				$$(getGroupListId()).parse(groups.json().content);
			});
	}
}

