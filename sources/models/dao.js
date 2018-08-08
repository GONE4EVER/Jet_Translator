export default class DataAccessObject {
	constructor([words, groups]) {
		this.setWordsStorage(words);
		this.setGroupsStorage(groups);

		this.wordSubs = [];
		this.groupSubs = [];
	}

	get getWordsStorageLink() {
		return this.wordsStore;
	}
	get getGroupsStorageLink() {
		return this.groupsStore;
	}

	set setWordsStorage(array) {
		this.wordsStore = array;
	}
	set setGroupsStorage(array) {
		this.groupsStore = array;
	}

	subscribe(source, target) {
		if (target === this.getWordsStorageLink()) {
			this.wordSubs.push(source);
		}
		else if (target === this.getGroupsStorageLink()) {
			this.groupSubs.push(source);
		}
	}

	get getWordSubscribers() {

	}
	get getGroupSubscribers() {

	}
}
