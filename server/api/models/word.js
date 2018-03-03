const mongoose = require("mongoose");

const wordSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	value: {
    	type: String,
    	required: true
	},
	translation: {
		type: [String],
		default: []
	},
	partOfSpeech: {
    	type: String,
    	default: ""
	}
});

module.exports = mongoose.model("Word", wordSchema);
