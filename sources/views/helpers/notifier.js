class Notifier {
	constructor(words) {
		this.setWordsStorage(words);

		this.wordSubs = [];
	}

	get getWordsStorageLink() {
		return this.wordsStore;
	}

	set setWordsStorage(array) {
		this.wordsStore = array;
	}

	subscribe(source, target) {
		if (target === this.getWordsStorageLink()) {
			this.wordSubs.push(source);
		}
	}

	get getWordSubscribers() {

	}
}

const createNotifier = dataToBind => new Notifier(dataToBind);

export default createNotifier;
