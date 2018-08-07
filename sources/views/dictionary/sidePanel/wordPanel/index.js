import {update, removeTranslation, addWord} from "./functions";

const TRANSLATION_INPUT_ID = "top:dictionary:wordPanel:translationInput";
const TRANSLATIONS_LIST_ID = "top:dictionary:wordPanel:translationsList";
const WORD_PANEL_ID = "top:dictionary:wordPanel";

const getWordPanelId = () => WORD_PANEL_ID;
const getTranslationInputId = () => TRANSLATION_INPUT_ID;
const getTranslationsListId = () => TRANSLATIONS_LIST_ID;


const toolbar = [
	{
		css: {
			display: "flex",
			"flex-direction": "row",
			"justify-content": "space-around",
			"align-items": "center"
		},
		cols: [
			{
				view: "icon",
				// value: "Update <span class='webix_icon fa-close'></span>",
				icon: "edit",
				tooltip: "Edit selected",
				on: {
					onItemClick() {
						const form = $$(getWordPanelId());

						if (form.validate()) {
							let data = form.getValues();

							update(data);
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

const list = {
	id: getTranslationsListId(),
	view: "list",
	gravity: 2,
	invalidMessage: "invalid value",
	bottomPadding: 5,
	select: true
};

const translationInput = {
	id: getTranslationInputId(),
	view: "textarea",
	name: "translation",
	labelWidth: 110
};

const tabs = {
	view: "tabview",
	minHeight: 200,
	cells: [
		{
			header: "Translations",
			body: list
		},
		{
			header: "New translation",
			body: translationInput
		}
	]
};

const wordPanel = {
	id: getWordPanelId(),
	view: "form",
	minWidth: 300,
	elements: [
		{view: "template", template: "Word info", type: "section"},
		{name: "value", id: "value", view: "text", label: "Value", labelWidth: 110, invalidMessage: "the field is empty", bottomPadding: 5},
		tabs,
		{name: "partOfSpeech", id: "partOfSpeech", view: "text", label: "Part of speech", labelWidth: 110, invalidMessage: "invalid value", bottomPadding: 15},
		...toolbar
	],
	rules: {
		$all: webix.rules.isNotEmpty
	},
	on: {
		onBeforeValidate() {
			// $$(getTranslationInputId()).show();
		},
		onValues() {
			$$(getTranslationInputId()).setValue("");
		}
	}
};

export default wordPanel;
export {
	getWordPanelId,
	getTranslationInputId,
	getTranslationsListId
};
