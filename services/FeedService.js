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

const findLikeStatus = ({ feed_id }) => {
  return prisma.feeds.findUnique({
    where: { id: Number(feed_id) },
    select: {
      isLiked: true,
    },
  });
};

// const changeToLiked = ({ feed_id, user_id }) => {
//   return (
//     prisma.likes.create({
//       data: {
//         feed_id,
//         user_id,
//       },
//     }),
//     prisma.feeds.update({
//       where: {
//         id: feed_id,
//       },
//       data: {
//         isLiked: 1,
//       },
//     })
//   );
// }

const changeToLiked = ({ feed_id, user_id }) => {
  prisma.likes.create({
    data: {
      feed_id,
      user_id,
    },
  }),
    prisma.feeds.update({
      where: {
        id: feed_id,
      },
      data: {
        isLiked: true,
      },
    });
};

const deleteLiked = ({ feed_id }) => {
  return (
    prisma.likes.delete({ where: { id: feed_id } }),
    prisma.feeds.update({
      where: {
        id: feed_id,
      },
      data: {
        isLiked: 0,
      },
    })
  );
};

module.exports = {
  findFeeds,
  findComments,
  createComment,
  changeToLiked,
  deleteLiked,
  findLikeStatus,
};
