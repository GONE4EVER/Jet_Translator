import DAO from "../../DAO/groupsDAO";

function getGroupsList() {
	return DAO.getAllGroups();
}

function addNewGroup(data) {
	delete data.id;
	delete data._id;

	return DAO.addNewGroup(data);
}

function updateGroup(data) {
	delete data.id;

	let updateOps = [];

	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			updateOps.push({property: key, value: data[key]});
		}
	}

	return DAO.updateGroup(data._id, updateOps).then(res => res.json());
}

function deleteGroup(id) {
	return DAO.deleteGroup(id);
}

function removeWord(id, value) {
	const options = [
		{
			property: "deleteFlag",
			value: "true"
		},
		{
			property: "translation",
			value: `${value}`
		}
	];

	return DAO.removeWord(id, options);
}

export {
	addNewGroup,
	deleteGroup,
	getGroupsList,
	removeWord,
	updateGroup

};
