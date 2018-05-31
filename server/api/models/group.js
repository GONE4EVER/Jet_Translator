const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	created: String,
	words: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Word",
			required: true
		}
	]
});

module.exports = mongoose.model("Group", groupSchema);
