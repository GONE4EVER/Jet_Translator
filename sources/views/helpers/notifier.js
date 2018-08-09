class Notifier {
	constructor(data) {
		this.setStorage(data);

		this.subs = [];
	}

	get getWordsStorageLink() {
		return this.wordsStore;
	}

	set setStorage(array) {
		this.wordsStore = array;
	}

	subscribe(source, target) {
		if (target === this.getWordsStorageLink()) {
			this.subs.push(source);
		}
	}

	get getSubscribers() {
		return this.subs;
	}
}

const createNotifier = dataToBind => new Notifier(dataToBind);

export default createNotifier;
