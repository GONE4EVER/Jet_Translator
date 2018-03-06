export function getAllWords() {
	return webix.ajax().get("http://localhost:3000/api/words/");
}

export function getWord(id) {
	return webix.ajax().get(`http://localhost:3000/api/words/${id}`);
}
