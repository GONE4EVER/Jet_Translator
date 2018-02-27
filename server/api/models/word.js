const mongoose = require("mongoose");

const str = {
	type: String,
	default: ""
};

const wordSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	value: str,
	translation: str,
	partOfSpeech: str
});

module.exports = mongoose.model("Word", wordSchema);
