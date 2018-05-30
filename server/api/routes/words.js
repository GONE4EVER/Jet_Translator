const express = require("express");
const Word = require("../models/word");

const get = require("./words/get");
const getAll = require("./words/getAll");
const post = require("./words/post");
const update = require("./words/patch");
const remove = require("./words/delete");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", post);
router.patch("/:id", update);
router.delete("/:id", remove);


module.exports = router;
