const { FeedService } = require("../services");
const errorWrapper = require("../errors/errorWrapper");

const getFeeds = errorWrapper(async (req, res) => {
  const feeds = await FeedService.findFeeds(req.query);
  res.status(200).json({ feeds });
});

const getComments = errorWrapper(async (req, res) => {
  const { feedId } = req.params;
  const comments = await FeedService.findComments({ feed_id: Number(feedId) });
  res.status(200).json({ comments });
});

const postComment = errorWrapper(async (req, res) => {
  const { feedId } = req.params;
  const { id: userIdFromToken } = req.foundUser;
  const { contents } = req.body;

  const createdComment = await FeedService.createComment({
    feed_id: Number(feedId),
    user_id: userIdFromToken,
    contents,
  });
  res.status(201).json({ createdComment });
});

module.exports = { getFeeds, getComments, postComment };
