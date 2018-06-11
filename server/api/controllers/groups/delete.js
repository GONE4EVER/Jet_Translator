const Group = require("../../models/group");

function remove(req, res) {
	const id = req.params.id;

	Group.remove({_id: id})
		.exec()
		.then((result) => {
			res.status(200).json({
				message: result.n === 1 ? "Deleted successfully" : "Item doesn`t exist",
				request: {
					type: "DELETE",
					url: `${req.baseUrl}/${id}`,
					data: result
				}
			});
		})
		.catch((err) => {
			res.status(500).json(err);
		});
}

module.exports = remove;
