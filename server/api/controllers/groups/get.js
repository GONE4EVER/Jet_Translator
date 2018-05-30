const Group = require("../../models/group");

function getCertain(req, res) {
	const id = req.params.id;
	Group.findById(id)
		.select("_id name created words")
		.populate([{path: "words", model: "Word", select: "_id value translation partOfSpeech"}])
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