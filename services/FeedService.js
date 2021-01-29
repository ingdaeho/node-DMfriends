const prisma = require("../prisma");
const { makeQueryOption } = require("../utils");

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

module.exports = {
  findFeeds,
  findComments,
  createComment,
};
