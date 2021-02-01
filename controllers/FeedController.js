const { FeedService } = require("../services");
const { errorWrapper } = require("../errors");

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

const changeLikeStatus = errorWrapper(async (req, res) => {
  const { feedId } = req.params;
  const { id: userIdFromToken } = req.foundUser;

  const foundLikeStatus = await FeedService.findLikeStatus({ feed_id: feedId });
  const { isLiked: likeStatusFromFeed } = foundLikeStatus;

  if (!likeStatusFromFeed) {
    const toLike = await FeedService.changeToLiked({
      feed_id: Number(feedId),
      user_id: userIdFromToken,
    });
    res.status(200).json({ toLike });
  }

  if (likeStatusFromFeed) {
    const toNotLiked = await FeedService.deleteLiked({
      feed_id: Number(feedId),
    });
    res.status(200).json({ toNotLiked });
  }
});

module.exports = { getFeeds, getComments, postComment, changeLikeStatus };
