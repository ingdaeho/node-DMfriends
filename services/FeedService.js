const prisma = require("../prisma");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

const findFeeds = (query) => {
  const { offset, limit, ...fields } = query;

  return prisma.feeds.findMany({
    include: {
      characters: {
        select: {
          name: true,
        },
      },
      feed_images: {
        select: {
          image_url: true,
        },
      },
      feed_comments: {
        select: {
          user_id: true,
          contents: true,
        },
      },
      likes: {},
    },
    skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      created_at: "desc",
    },
  });
};

const findComments = ({ feed_id }) => {
  return prisma.feed_comments.findMany({
    where: { feed_id },
    orderBy: {
      created_at: "desc",
    },
  });
};

const createComment = ({ feed_id, user_id, contents }) => {
  return prisma.feed_comments.create({
    data: {
      feed_id,
      user_id,
      contents,
    },
  });
};

const findLikeStatus = ({ feed_id, user_id }) => {
  const value = Number(feed_id);
  return prisma.likes.findFirst({
    where: { feed_id: value, user_id },
  });
};

const changeToLiked = ({ feed_id, user_id }) => {
  return prisma.likes.create({
    data: {
      feed_id,
      user_id,
    },
  });
};

const deleteLiked = ({ id: foundStatusId }) => {
  return prisma.likes.delete({
    where: {
      id: foundStatusId,
    },
  });
};

module.exports = {
  findFeeds,
  findComments,
  createComment,
  changeToLiked,
  deleteLiked,
  findLikeStatus,
};
