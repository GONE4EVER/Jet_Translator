export const words = new webix.DataCollection({
	url: "http://localhost:3000/api/words/",
	save: "rest->http://localhost:3000/api/words/"
	// datatype: "jsarray"
});

export function getAllWords() {
	return webix.ajax().get("http://localhost:3000/api/words/")
		.then((res) => {
			let data = [];
			for (let item of res.json().content) {
				data.push({groupID: item.id, words: item.words});
			}
			words.add(data);
			return res;
		});
}

export function getWord(id) {
	return webix.ajax().get(`http://localhost:3000/api/words/${id}`);
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
