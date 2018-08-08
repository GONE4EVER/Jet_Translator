export function getAllWords() {
	return webix.ajax().get("http://localhost:3000/api/words/")
		.then((res) => {
			let data = [];
			for (let item of res.json().content) {
				data.push({groupID: item.id, words: item.words});
			}

			return res;
		});
}

export function getWordByOccurrences(params) {
	return webix.ajax().get(`http://localhost:3000/api/words/${params}`);
}

export function addNewWord(data) {
	return webix.ajax()
		.headers({"Content-Type": "application/json"})
		.post("http://localhost:3000/api/words/", data);
}

export function deleteWord(id) {
	return webix.ajax().del(`http://localhost:3000/api/words/${id}`);
}

export function updateWord(id, updateOptions) {
	return webix.ajax()
		.headers({"Content-Type": "application/json"})
		.patch(`http://localhost:3000/api/words/${id}`, JSON.stringify(updateOptions));
}

export function deleteTranslation(id, updateOptions) {
	return webix.ajax()
		.headers({"Content-Type": "application/json"})
		.patch(`http://localhost:3000/api/words/${id}`, JSON.stringify(updateOptions));
}

export default class Notifier {}
