export const groups = new webix.DataCollection({
	datatype: "jsarray"
});


export function getAllGroups() {
	return webix.ajax().get("http://localhost:3000/api/groups/")
		.then((res) => {
			let data = [];
			for (let item of res.json().content) {
				data.push({groupID: item.id, words: item.words});
			}
			groups.add(data);
			return res;
		});
}
