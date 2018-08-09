import DataAccessObject from "./super";

class WordsDAO extends DataAccessObject {
	getAllWords() {
		return webix.ajax().get(`${this.link}`)
			.then((res) => {
				let data = [];

				for (let item of res.json().content) {
					data.push({groupID: item.id, words: item.words});
				}

				return res;
			});
	}

	addNewWord(data) {
		return webix.ajax()
			.headers(this.headers)
			.post(`${this.link}`, data);
	}

	deleteWord(id) {
		return webix.ajax().del(`${this.link}${id}`);
	}

	updateWord(id, updateOptions) {
		return webix.ajax()
			.headers(this.headers)
			.patch(`${this.link}${id}`, JSON.stringify(updateOptions));
	}

	removeTranslation(id, updateOptions) {
		return webix.ajax()
			.headers(this.headers)
			.patch(`${this.link}${id}`, JSON.stringify(updateOptions));
	}
}

const DAO = new WordsDAO(
	"http://localhost:3000/api/words/",
	{"Content-Type": "application/json"}
);

export default DAO;
