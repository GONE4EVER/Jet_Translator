import {update, removeTranslation} from "./functions";

const TRANSLATION_INPUT_ID = "top:dictionary:wordPanel:translationInput";
const TRANSLATIONS_LIST_ID = "top:dictionary:wordPanel:translationsList";
const WORD_PANEL_ID = "top:dictionary:wordPanel";

const getWordPanelId = () => WORD_PANEL_ID;
const getTranslationInputId = () => TRANSLATION_INPUT_ID;
const getTranslationsListId = () => TRANSLATIONS_LIST_ID;


const toolbar = [
	{},
	{
		cols: [
			{
				view: "button",
				value: "Update",
				click() {
					const form = $$(getWordPanelId());

					if (form.validate()) {
						let data = form.getValues();
						update.call(this, data);
					}
				}
			},
			{
				view: "button",
				value: "Clear",
				click() {
					$$(getWordPanelId()).clear();
					$$(getWordPanelId()).queryView({view: "list"}).clearAll();
				}
			},
			{
				view: "button",
				value: "Add New",
				type: "form",
				click() {
					const form = $$(getWordPanelId());

					console.log(form.getValues());
					/* webix.ajax()
							.post("http://localhost:3000/api/words/", $$(getWordPanelId()).getValues())
							.then(() => {})
							.catch(() => {}); */
				}
			}
		]
	},
	{
		view: "button",
		value: "Delete translation",
		type: "danger",
		click() {
			const data = $$(getWordPanelId()).getValues();
			removeTranslation.call(this, data);
		}
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
	labelWidth: 110,
	invalidMessage: "invalid value",
	bottomPadding: 5
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
	minWidth: 200,
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
			$$(getTranslationInputId()).show();
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
