const mongoose = require("mongoose");

const format = {
	type: String,
	default: ""
};

const wordSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	value: format,
	translation: {
		type: [String],
		default: []
	},
	partOfSpeech: format,
	groupId: {
		type: [String],
		default: ["default"]
	}
});

module.exports = mongoose.model("Word", wordSchema);
