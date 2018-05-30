const Group = require("../../models/group");

function getAll(req, res) {
	Group.find()
		.select("_id name created words")
		.populate([{path: "words", model: "Word", select: "_id value translation partOfSpeech"}])
		.then((result) => {
			const response = {
				content: result.map(item => ({
					id: item._id,
					name: item.name,
					created: item.created,
					words: item.words
				}))
			};
			res.status(200).json({
				count: result.length,
				request: {
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
