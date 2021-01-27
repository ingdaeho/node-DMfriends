const express = require("express");
const router = express.Router();

router.get("/:feedId");
router.get("/:feedId/comments");
router.post("/:feedId/comments");

module.exports = router;
