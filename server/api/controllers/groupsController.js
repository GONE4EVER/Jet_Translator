const get = require("./groups/get");
const getAll = require("./groups/getAll");
const post = require("./groups/post");
const update = require("./groups/patch");
const remove = require("./groups/delete.js");

module.exports = {
	get,
	getAll,
	post,
	update,
	remove
};
