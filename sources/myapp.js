import {JetApp, plugins} from "webix-jet";
import "./styles/app.css";

webix.ready(() => {
	webix.i18n.parseFormat = "%d-%m-%Y";
	webix.i18n.setLocale();
	let app = new JetApp({
		id:	APPNAME,
		version: VERSION,
		start: "/unlogged/unlogged.registration",
		routes: {
			"/newuser": "/unlogged/unlogged.registration",
			"/login": "/unlogged/unlogged.logIn",
			"/dictionary": "/top/dictionary"
		}
	});

	app.use(plugins.Locale);
	app.render();

	app.attachEvent("app:error:resolve", (name, error) => {
		window.console.error(error);
	});
});
