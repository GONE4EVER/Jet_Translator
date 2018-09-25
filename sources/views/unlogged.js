import {JetView} from "webix-jet";
import * as Navigator from "./helpers/navigationConstants";

const HEADER_ID = "header:logOut";
const HEADER_TEXT = "<div class='headerLink'><a route = '/top/dictionary'>My Own Dictionary</a></div>";

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
		this.show(Navigator.getSignInUrl());
	}
	signUp() {
		this.show(Navigator.getSignUpUrl());
	}
}
