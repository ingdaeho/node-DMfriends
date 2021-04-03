const prisma = require("../prisma");

const FEEDS_DEFAULT_OFFSET = 0;
const FEEDS_DEFAULT_LIMIT = 5;

const findFeeds = (query) => {
  const { limit, page } = query;

  let offset;
  if (page) {
    offset = page * 5;
  }

  return prisma.feeds.findMany({
    where: {
      deleted_at: null,
    },
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
          users: {
            select: {
              username: true,
            },
          },
          contents: true,
        },
      },
      likes: {},
    },
    skip: Number(offset) || FEEDS_DEFAULT_OFFSET,
    take: Number(limit) || FEEDS_DEFAULT_LIMIT,
    orderBy: {
      created_at: "desc",
    },
  });
};

const findComments = (fields) => {
  const { feed_id } = fields;
  return prisma.feed_comments.findMany({
    where: { feed_id, deleted_at: null },
    orderBy: {
      created_at: "desc",
    },
  });
};

const createComment = (fields) => {
  const { feed_id, user_id, contents } = fields;
  return prisma.feed_comments.create({
    data: {
      feed_id,
      user_id,
      contents,
    },
  });
};

const findLikeStatus = (fields) => {
  const { feed_id, user_id } = fields;
  const value = Number(feed_id);
  return prisma.likes.findFirst({
    where: {
      feed_id: value,
      user_id,
    },
  });
};

const changeToLiked = (fields) => {
  const { feed_id, user_id } = fields.data;
  return prisma.likes.create({
    data: {
      feed_id,
      user_id,
    },
  });
};

const deleteLiked = (fields) => {
  const { id: foundStatusId } = fields.data;
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
