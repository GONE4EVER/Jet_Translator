export function getAllWords() {
	return webix.ajax().get("http://localhost:3000/api/words/");
}

export function getWord(id) {
	return webix.ajax().get(`http://localhost:3000/api/words/${id}`);
}

export function updateWord(id, updateOptions) {
	console.log(JSON.stringify(updateOptions));
	return webix.ajax().headers({"Content-Type": "application/json"}).patch(`http://localhost:3000/api/words/${id}`, JSON.stringify(updateOptions));
}
