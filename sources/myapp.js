import {JetApp} from "webix-jet";
import "./styles/app.css";

webix.ready(() => {
	let app = new JetApp({
		id:	APPNAME,
		version: VERSION,
		start: "/top/start"
	});
	app.render();

	app.attachEvent("app:error:resolve", (name, error) => {
		window.console.error(error);
	});
});
