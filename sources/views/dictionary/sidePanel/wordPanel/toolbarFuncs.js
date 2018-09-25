import * as WordsController from "../../../controllers/wordsController";
import {getWordPanelId, getTranslationsListId} from ".";
import { getFullContentListId } from "../../mainPanel";


const onAddClick = () => {
	const form = $$(getWordPanelId());

	if (form.validate()) {
		const data = form.getValues();

		WordsController.addNewWord(data)
			.then((res) => {
				$$(getFullContentListId()).refresh();

				form.clear();
				webix.message({text: res.json().message});
			})
			.catch(err => webix.message({text: err}));
	}
};

const onClearClick = () => {
	const form = $$(getWordPanelId());
	form.clear();
	form.queryView({view: "list"}).clearAll();
};

const onDeleteClick = () => {
	const data = $$(getWordPanelId()).getValues();
	const list = $$(getTranslationsListId());

	if (list.getSelectedItem()) {
		WordsController.removeTranslation(data._id, list.getSelectedItem().value)
			.then((res) => {
				$$(getWordPanelId()).clear();
				list.remove(list.getSelectedId());
				list.refresh();
				webix.message({text: res.json().message});
			})
			.catch(err => webix.message({text: err}));
	}
};

const onEditClick = () => {
	const form = $$(getWordPanelId());

	if (form.validate()) {
		let data = form.getValues();

		WordsController.updateWord(data)
			.then((res) => {
				form.clear();
				form.queryView({view: "list"}).clearAll();

				webix.message({text: res.message});
			});
	}
};


export {
	onAddClick,
	onClearClick,
	onDeleteClick,
	onEditClick
};
