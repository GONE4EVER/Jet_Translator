import {JetView} from "webix-jet";

export default class signInForm extends JetView {
	config() {
		const signInBtn = {
			cols: [
				{
					view: "button",
					width: 100,
					label: "Sign In",
					click() {
						if ($$("signInForm").validate()) {
							this.$scope.app.callEvent("onAuthentication", [$$("signInForm").getValues()]);
						}
					}
				}
			]
		};

		const rememCheckBox = {
			cols: [
				{gravity: 0.45},
				{
					view: "checkbox",
					labelRight: "Remember me",
					bottomPadding: 10
				},
				{}
			]
		};

		const forgotPass = {
			align: "right",
			view: "template",
			borderless: true,
			template: "<a href = '#!/unloggedUser/fogpas' >Forgot Your Password?</a>",
			css: "align-center"
		};

		const form = {
			id: "signInForm",
			view: "form",
			width: 700,
			height: 400,
			rows: [
				{
					view: "template",
					type: "header",
					template: "Sign In",
					borderless: true
				},
				{
					height: 50
				},
				{
					id: "emailInput",
					type: "email",
					name: "email",
					view: "text",
					label: "<div class = 'name'><b>E-mail Address</b></div>",
					labelWidth: 200,
					bottomPadding: 15,
					width: 600,
					height: 40,
					invalidMessage: "Invalid E-Mail"
				},
				{
					id: "passwordInput",
					type: "password",
					name: "password",
					view: "text",
					label: "<div class = 'name'><b>Password</b></div>",
					labelWidth: 200,
					width: 600,
					height: 40,
					invalidMessage: "You can`t log in without filling this field"
				},
				{
					rows: [
						rememCheckBox,
						{
							cols: [
								{gravity: 0.55}, signInBtn, forgotPass
							]
						}
					]
				}
			],
			rules: {
				email: webix.rules.isEmail,
				password(value) { return value.trim() !== ""; }
			},
			elementsConfig: {
				on: {
					onFocus() {
						this.$scope.clearValidation();
					}
				}
			}
		};

		return form;
	}

	clearValidation() {
	}
}
