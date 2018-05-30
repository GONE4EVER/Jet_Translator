const express = require("express");

const router = express.Router();

const get = require("./words/get");
const getAll = require("./words/getAll");
const post = require("./words/post");
const update = require("./words/patch");
const remove = require("./words/delete");

router.get("/", getAll);
router.get("/:id", get);
router.post("/", post);
router.patch("/:id", update);
router.delete("/:id", remove);


module.exports = router;
