const mongoose = require("mongoose");

const format = {
	type: String,
	default: ""
};

const wordSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	value: format,
	translation: format,
	partOfSpeech: format,
	groupId: {
		type: [String],
		required: true
	}
});

module.exports = mongoose.model("Word", wordSchema);
