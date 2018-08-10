import {JetView} from "webix-jet";

import * as GroupsController from "../controllers/groupsController";
import * as WordsController from "../controllers/wordsController";
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
		Promise.all([WordsController.getWordsList(), GroupsController.getGroupsList()])
			.then(([words, groups]) => {
				this.config.data = {words, groups};
				$$(getFullContentListId()).parse(words.json().content);
				$$(getGroupListId()).parse(groups.json().content);
			});
	}
}

