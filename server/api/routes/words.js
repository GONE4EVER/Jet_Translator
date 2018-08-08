const express = require("express");
const wordsController = require("../controllers/wordsController");

const router = express.Router();

router.get("/", wordsController.getAll);
router.get("/:params", wordsController.get);
router.post("/", wordsController.post);
router.patch("/:id", wordsController.update);
router.delete("/:id", wordsController.remove);


module.exports = router;
