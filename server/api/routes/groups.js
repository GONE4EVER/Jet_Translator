const express = require("express");

const router = express.Router();

const get = require("./groups/get");
const getAll = require("./groups/getAll");
const post = require("./groups/post");
const update = require("./groups/patch");
const remove = require("./groups/delete.js");

router.get("/", getAll);
router.get("/:id", get);
router.post("/", post);
router.patch("/:id", update);
router.delete("/:id", remove);


module.exports = router;
