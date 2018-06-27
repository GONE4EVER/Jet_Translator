import {JetView} from "webix-jet";
// import {users} from "../models/users";
import authorize from "../helpers/exportFunctions";
import LogInForm from "./sign_in_form";

export default class LogInView extends JetView {
	config() {
		const view = {
			rows: [
				{gravity: 0.7},
				LogInForm,
				{}
			]
		};
		return view;
	}

	register() {
		this.show("/top/sign_up");
	}

	init() {
		this.on(this.app, "onAuthentication", (val) => {
			this.authenticate(val);
		});
	}

	authenticate(val) {
		let userData = users.find(obj => obj.email === val.email && obj.password === val.password);
		if (userData.length) {
			authorize.call(this);
		}
		else {
			webix.alert({
				title: "Authentication error",
				type: "alert-error",
				text: "Wrong E-Mail or Password",
				callback: () => {
					$$("emailInput").focus();
				}
			});
		}
	}
}
