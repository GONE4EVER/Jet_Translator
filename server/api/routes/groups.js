const express = require("express");
const groupsController = require("../controllers/groupsController");

const router = express.Router();

router.get("/", groupsController.getAll);
router.get("/:id", groupsController.get);
router.post("/", groupsController.post);
router.patch("/:id", groupsController.update);
router.delete("/:id", groupsController.remove);


module.exports = router;
