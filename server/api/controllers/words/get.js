const Word = require("../../models/word");

function getCertain(req, res) {
	const id = req.params.id;

	Word.findById(id)
		.select("_id value translation partOfSpeech")
		.exec()
		.then((result) => {
			if (result) {
				res.type("json");

				res.status(200).json({
					request: {
						type: "GET",
						url: `${req.baseUrl}/${id}`
					},
					content: result
				});
			}
			else {
				res.status(404).json({
					message: "No valid entries found for provided ID"
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}

module.exports = getCertain;
