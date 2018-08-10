import DataAccessObject from "./super";

class GroupsDAO extends DataAccessObject {
	getAllGroups() {
		return webix.ajax().get(`${this.link}`)
			.then((res) => {
				let data = [];

				for (let item of res.json().content) {
					data.push({groupID: item.id, words: item.words});
				}

				return res;
			});
	}

	addNewGroup(data) {
		return webix.ajax()
			.headers(this.headers)
			.post(`${this.link}`, data);
	}

	deleteGroup(id) {
		return webix.ajax().del(`${this.link}${id}`);
	}

	updateGroup(id, updateOptions) {
		return webix.ajax()
			.headers(this.headers)
			.patch(`${this.link}${id}`, JSON.stringify(updateOptions));
	}

	removeWordFromGroup(id, updateOptions) {
		return webix.ajax()
			.headers(this.headers)
			.patch(`${this.link}${id}`, JSON.stringify(updateOptions));
	}
}

const DAO = new GroupsDAO(
	"http://localhost:3000/api/groups/",
	{"Content-Type": "application/json"}
);

export default DAO;
