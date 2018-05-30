const Word = require("../../models/word");

const MAX_AGE = 120;

function getAll(req, res) {
	Word.find()
		.select("_id value translation partOfSpeech")
		.then((result) => {
			console.log(req.get("etag"));

			const response = {
				content: result.map(item => ({
					_id: item._id,
					value: item.value,
					partOfSpeech: item.partOfSpeech,
					translation: item.translation
				}))
			};

			res.header("Content-Length", result.length);
			res.header("Cache-Control", `no-cache, max-age=${MAX_AGE}`);
			res.type("json");

			res.status(302).json({
				req: {
					type: "GET",
					url: `${req.baseUrl}`
				},
				...response
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}

module.exports = getAll;
