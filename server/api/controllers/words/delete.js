const Word = require("../../models/word");

function remove(req, res) {
	const id = req.params.id;

	Word.remove({_id: id})
		.exec()
		.then((result) => {
			if (result.n === 1) {
				res.status(200).json({
					message: "Deleted successfully",
					request: {
						type: "DELETE",
						url: `${req.baseUrl}/${id}`,
						data: result
					}
				});
			}
			else {
				res.status(200).json({
					message: "Item doesn`t exist",
					request: {
						type: "DELETE",
						url: `${req.baseUrl}/${id}`,
						data: result
					}
				});
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
}

module.exports = remove;
