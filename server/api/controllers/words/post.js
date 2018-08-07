const mongoose = require("mongoose");
const Word = require("../../models/word");

function add(req, res) {
	if (!req.body) return res.sendStatus(400);

	const word = new Word({
		_id: mongoose.Types.ObjectId(),
		value: req.body.value,
		translation: req.body.translation,
		partOfSpeech: req.body.partOfSpeech
	});

	return word.save()
		.then(result => res.status(201).json({
			request: {
				type: "POST",
				url: `${req.baseUrl}`
			},
			message: "Added successfully",
			item: {
				_id: result._id,
				value: result.value,
				translation: result.translation,
				partOfSpeech: result.partOfSpeech
			}
		}))
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
}

module.exports = add;
