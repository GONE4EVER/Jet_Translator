const mongoose = require("mongoose");

const wordSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	value: String,
	translation: String,
	partOfSpeech: String
});

module.exports = mongoose.model("Word", wordSchema);
