export function getAllGroups() {
	return webix.ajax().get("http://localhost:3000/api/groups/");
}

export function getGroupContent(id) {
	return webix.ajax().get(`http://localhost:3000/api/groups/${id}`);
}
