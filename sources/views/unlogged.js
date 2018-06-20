import {JetView} from "webix-jet";

const HEADER_TEXT = "<div style = 'cursor: pointer; text-align: center; font-size: 24px; padding-left: 10%'><a route = '/top/dictionary'>My Own Dictionary</a></div>";
const HEADER_ID = "header:logOut";

const getHeaderId = () => HEADER_ID;

export default class TopView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const header = {
			id: getHeaderId(),
			view: "toolbar",
			height: 50,
			elements: [
				{template: HEADER_TEXT, type: "header", borderless: "true"},
				{view: "button", type: "icon", css: "whiteButton", id: "sign_in", icon: "sign-in", label: _("<span>Sign In</span>"), width: 100, click() { this.$scope.signIn(); }},
				{view: "button", type: "icon", css: "whiteButton", id: "sign_up", icon: "user-circle", label: _("<span>Sign Up</span>"), width: 100, click() { this.$scope.signUp(); }}
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

	signIn() {
		this.show("./unlogged.sign_in");
	}

	signUp() {
		this.show("./unlogged.sign_up");
	}
}
