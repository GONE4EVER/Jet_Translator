const mongoose = require("mongoose");

const format = {
	type: String,
	required: true
};

const groupSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: format,
	created: format,
	count: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Group", groupSchema);
