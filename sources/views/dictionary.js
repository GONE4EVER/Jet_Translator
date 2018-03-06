import {JetView} from "webix-jet";
import sidePanel from "./dictionary/sidePanel/index";
import {getAllWords} from "../models/words";
import {getAllGroups} from "../models/groups";

export default class DictionatyTopView extends JetView {
	config() {
		const all = {
			id: "allList",
			view: "list",
			maxWidth: 450,
			select: true,
			template: "#value# (#partOfSpeech#)",
			on: {
				onAfterSelect: () => {
					$$("groupContent").unselectAll();
				}
			}
		};

		const groups = {
			id: "groupList",
			view: "list",
			maxWidth: 450,
			select: true,
			template: "#name# (#created#)",
			on: {
				onAfterSelect(id) {
					this.$scope.app.callEvent("onGroupContentRequest", [this, id]);
				}
			}
		};

		const groupContent = {
			id: "groupContent",
			view: "list",
			maxWidth: 450,
			select: true,
			template: "#value# (#partOfSpeech#)",
			on: {
				onAfterSelect: (id) => {
					$$("allList").unselectAll();
				}
			}
		};

		const layout = {
			cols: [
				all, groups, groupContent, sidePanel
			]
		};
		return layout;
	}
	init() {
		getAllWords().then((res) => {
			console.log(res.json().content);

			$$("allList").parse(res.json().content);
		});
		getAllGroups().then((res) => {
			const data = res.json().content;
			$$("groupList").parse(data);
		});
	}
}
