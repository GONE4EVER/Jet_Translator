export function getAllWords() {
	return webix.ajax().get("http://localhost:3000/api/words/");
}

export function getWord(id) {
	return webix.ajax().get(`http://localhost:3000/api/words/${id}`);
}

export function updateWord(id, updateOptions) {
	return webix.ajax().patch(`http://localhost:3000/api/words/${id}`, JSON.stringify(updateOptions));
}
