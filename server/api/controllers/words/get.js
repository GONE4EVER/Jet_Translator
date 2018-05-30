const Word = require("../../models/word");

const MAX_AGE = 120;

function getCertain(req, res) {
	const id = req.params.id;

	Word.findById(id)
		.select("_id value translation partOfSpeech")
		.then((result) => {
			if (result) {
				res.status(302).json({
					content: result,
					request: {
						type: "GET",
						url: `${req.baseUrl}/${id}`
					}
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
