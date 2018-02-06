import {JetView} from "webix-jet";

export default class TopView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const header = {
			id: "logOutHeader",
			view: "toolbar",
			height: 50,
			elements: [
				{template: "<div style = 'text-align: center; font-size: 24px'><a route = '/top/dictionary'>My Own Dictionary</a></div>", type: "header", borderless: "true"},
				{view: "button", type: "icon", css: "whiteButton", id: "logIn", label: _("<span>Log In</span>"), width: 100, click() { this.$scope.logIn(); }},
				{view: "button", type: "icon", css: "whiteButton", id: "register", label: _("<span>Register</span>"), width: 100, click() { this.$scope.registration(); }}
			]
		};

		const view = {
			rows: [
				header,
				{
					id: "container",
					css: {background: "white"},
					cols: [
						{},
						{$subview: true},
						{}
					]
				}
			]
		};
		return view;
	}

	init() {

	}

	logIn() {
		this.show("./unlogged.logIn");
	}

	registration() {
		this.show("./unlogged.registration");
	}
}
