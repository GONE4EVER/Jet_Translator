const mongoose = require("mongoose");

const format = {
	type: String,
	required: true
};

const groupSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: format,
	created: format,
	words: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Word"
		}
	]
});

module.exports = mongoose.model("Group", groupSchema);
