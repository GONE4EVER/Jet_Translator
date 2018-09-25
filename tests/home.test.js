/* const puppeteer = require("puppeteer"); */

const entryPoint = "http://localhost:8081/";
const testsPath = "./tests/";

describe("Dictionary", () => {
	beforeAll(async () => {
		// browser = await puppeteer.launch();
		await page.goto(entryPoint);
	});

	it("should pass the link in apps header", async () => {
		const valueInputSelector = "div[view_id=value] input[type=text]";
		const partOfSpeechInputSelector = "div[view_id=partOfSpeech] input[type=text]";
		const addButton = "div[view_id=\"top:dictionary:wordPanel\"] .fa-plus";
		const popupSelector = ".webix_info div";

		await page.waitForSelector(".headerLink");
		await page.click(".headerLink");

		await page.waitForSelector(".webix_view .webix_menu");

		await page.click(valueInputSelector);
		await page.type(valueInputSelector, "BohemianPhapsody");

		await page.click(partOfSpeechInputSelector);
		await page.type(partOfSpeechInputSelector, "Mamaaa, u uu uuu");

		await page.click(addButton);
		await page.waitForSelector(popupSelector);

		await page.screenshot({path: `${testsPath}menu.png`});
	});

	/* afterAll(async () => {
        browser.close();
    }); */
});
