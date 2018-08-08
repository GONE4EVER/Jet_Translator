import {update, removeTranslation, addWord} from "./functions";
import {getWordPanelId, getTranslationsListId} from ".";

const css = {
	display: "flex",
	"flex-direction": "row",
	"justify-content": "space-around",
	"align-items": "center"
};

const toolbar = [
	{
		css,
		cols: [
			{
				view: "icon",
				icon: "edit",
				tooltip: "Edit selected",
				on: {
					onItemClick() {
						const form = $$(getWordPanelId());

						if (form.validate()) {
							let data = form.getValues();

							update(data)
								.then((res) => {
									form.clear();
									form.queryView({view: "list"}).clearAll();

									webix.message({text: res.message});
								});
						}
					}
				}
			},
			{
				view: "icon",
				icon: "paint-brush ",
				tooltip: "Clear form",
				on: {
					onItemClick() {
						const form = $$(getWordPanelId());
						form.clear();
						form.queryView({view: "list"}).clearAll();
					}
				}
			},
			{
				view: "icon",
				icon: "plus",
				tooltip: "Add this word to the database",
				on: {
					onItemClick() {
						const form = $$(getWordPanelId());

						if (form.validate()) {
							const data = form.getValues();

							addWord(data);
						}
					}
				}
			},
			{
				view: "icon",
				icon: "trash",
				tooltip: "Delete selected",
				on: {
					onItemClick() {
						const data = $$(getWordPanelId()).getValues();
						const list = $$(getTranslationsListId());

						if (list.getSelectedItem()) {
							removeTranslation(data._id, list.getSelectedItem().value)
								.then((res) => {
									list.remove(list.getSelectedId());
									list.refresh();
									webix.message({text: res.json().message});
								})
								.catch(err => webix.message({text: err}));
						}
					}
				}
			}
		]
	}
];

export {
	toolbar
};
