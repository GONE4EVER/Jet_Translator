import {JetView} from "webix-jet";

const PASSWORD_INPUT_ID = "registration:password:input";
const PASSWORD_SECURITY_LEVEL_OUTPUT_ID = "registration:password:securityLevel";
const REGISTRATION_FORM_ID = "registration:form";

const getPasswordInputId = () => PASSWORD_INPUT_ID;
const getPasswordSecurityLevelId = () => PASSWORD_SECURITY_LEVEL_OUTPUT_ID;
const getRegistrationFormId = () => REGISTRATION_FORM_ID;

function checkSecurityLevel() {
	let len = $$(getPasswordInputId()).getValue().length;
	if (len < 5) {
		return ["red", "battery-empty"];
	}
	else if (len < 10) {
		return ["orange", "battery-half"];
	}
	return ["green", "battery-full"];
}

function displaySecurityLevel() {
	let ico = checkSecurityLevel();
	$$(getPasswordSecurityLevelId()).setHTML(`<span style='font-size:25px;
	color: ${ico[0]}' class='webix_icon fa-${ico[1]}'></span>`);
}

export default class RegistrationForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const form = {
			id: getRegistrationFormId(),
			view: "form",
			width: 800,
			height: 450,
			header: _("Register"),
			rows: [
				{
					view: "template",
					type: "header",
					template: _("Register"),
					bottomPadding: 0,
					borderless: true
				},
				{
					height: 40
				},
				{
					name: "name",
					attributes: {
						maxlength: 20,
						required: "true",
						title: "Maximum name length: 20 symbols"
					},
					view: "text",
					label: _("<div class = 'name'><b>Name</b></div>"),
					labelWidth: 250,
					bottomPadding: 15,
					width: 700,
					height: 40,
					required: true,
					invalidMessage: "Empty name field is not allowed"
				},
				{
					id: "emailInput",
					name: "email",
					attributes: {
						maxlength: 20,
						required: "true",
						title: "This field is necessary to fill"
					},
					type: "email",
					view: "text",
					label: _("<div class = 'name'><b>E-Mail Address</b></div>"),
					labelWidth: 250,
					bottomPadding: 15,
					width: 700,
					height: 40,
					required: true,
					invalidMessage: _("Invalid E-Mail")
				},
				{
					id: "passwordInput",
					name: "password",
					type: "password",
					view: "text",
					label: _("<div class = 'name'><b>Password</b></div>"),
					labelWidth: 250,
					bottomPadding: 15,
					width: 700,
					height: 40,
					required: true,
					invalidMessage: _("Empty password field is not allowed"),
					on: {
						onTimedKeyPress: displaySecurityLevel
					}
				},
				{
					name: "confPass",
					type: "password",
					view: "text",
					label: _("<div class = 'name'><b>Confirm Password</b></div>"),
					labelWidth: 250,
					bottomPadding: 15,
					width: 700,
					height: 40,
					invalidMessage: _("Password wasn`t confirmed"),
					required: true
				},
				{
					cols: [
						{gravity: 0.6},
						{
							view: "button",
							id: "regBtn",
							width: 100,
							label: _("Register"),
							click() {
								const regForm = $$(getRegistrationFormId());

								regForm.clearValidation();
								if (regForm.validate()) {
									this.$scope.app.callEvent("onRegistration", [regForm.getValues()]);
								}
							}
						},
						{
							view: "template",
							id: getPasswordSecurityLevelId(),
							borderless: true
						}
					]
				}
			],
			rules: {
				name(value) { return value.trim() !== ""; },
				email(value) { return webix.rules.isEmail(value); },
				password(value) { return value.trim() !== ""; },
				confPass(value) { return value === $$(getPasswordInputId()).getValue(); }
			}
		};
		return form;
	}
}
