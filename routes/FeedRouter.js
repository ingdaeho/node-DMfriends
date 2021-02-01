const express = require("express");
const router = express.Router();
const { FeedController } = require("../controllers");
const validateToken = require("../middlewares/validateToken");

router.get("/", FeedController.getFeeds);
router.get("/:feedId/comments", FeedController.getComments);
router.post("/:feedId/comments", validateToken, FeedController.postComment);
router.post("/:feedId/likes", validateToken, FeedController.changeLikeStatus);

module.exports = router;
