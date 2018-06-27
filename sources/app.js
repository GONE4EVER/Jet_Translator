import {JetApp, plugins} from "webix-jet";

webix.ready(() => {
	webix.i18n.parseFormat = "%d-%m-%Y";
	webix.i18n.setLocale();
	let app = new JetApp({
		id:	APPNAME,
		version: VERSION,
		start: "/unlogged/unlogged.sign_up",
		routes: {
			"/sign_up": "/unlogged/unlogged.sign_up",
			"/sign_in": "/unlogged/unlogged.sign_in",
			"/dictionary": "/top/dictionary"
		}
	});

	app.use(plugins.Locale);
	app.render();

	app.attachEvent("app:error:resolve", (name, error) => {
		window.console.error(error);
	});
});
