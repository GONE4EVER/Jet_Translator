const Word = require("../../models/word");

function getCertain(req, res) {
	// const params = JSON.parse(req.query.params);
	const params = new RegExp(JSON.parse(req.query.params));

	Word.find({value: params})
		.exec()
		.then((result) => {
			console.log(result);
		})
		.catch();
	/* .select("_id value translation partOfSpeech")
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
		}); */

	/* Word.findById(id)
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
		}); */
}

module.exports = getCertain;
