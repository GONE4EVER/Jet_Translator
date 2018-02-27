const mongoose = require("mongoose");

const str = {
	type: String,
	default: ""
};

const wordSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	value: str,
	translation: str,
	partOfSpeech: str,
	group: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Word", wordSchema);
