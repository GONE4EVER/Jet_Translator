import * as GroupsController from "../../../controllers/groupsController";
import {getGroupPanelId} from ".";

const onAddClick = () => {
	const form = $$(getGroupPanelId());

	if (form.validate()) {
		const data = form.getValues();

		GroupsController.addNewGroup(data)
			.then((res) => {
				webix.message({text: res.json().message});
			})
			.catch(err => webix.message({text: err}));
	}
};

const onClearClick = () => {
	const form = $$(getGroupPanelId());
	form.clear();
	form.queryView({view: "list"}).clearAll();
};

const onDeleteClick = () => {

};

const onEditClick = () => {

};

export {
	onAddClick,
	onClearClick,
	onDeleteClick,
	onEditClick
};
