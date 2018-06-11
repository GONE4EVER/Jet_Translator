const Word = require("../../models/word");

function getAll(req, res) {
	Word.find()
		.select("_id value translation partOfSpeech")
		.exec()
		.then((result) => {
			const response = result.map(item => ({
				_id: item._id,
				value: item.value,
				partOfSpeech: item.partOfSpeech,
				translation: item.translation
			}));

			res.status(200).json({
				request: {
					type: "GET",
					url: `${req.baseUrl}`
				},
				content: response
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}

module.exports = getAll;
