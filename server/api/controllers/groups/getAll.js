const Group = require("../../models/group");

function getAll(req, res) {
	Group.find()
		.select("_id name created words")
		.populate([{path: "words", model: "Word", select: "_id value"}])
		.exec()
		.then((result) => {
			const response = result.map(item => ({
				id: item._id,
				name: item.name,
				created: item.created,
				words: item.words
			}));

			res.status(302).json({
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
