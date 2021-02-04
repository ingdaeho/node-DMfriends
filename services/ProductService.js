const prisma = require("../prisma");

const PRODUCTS_DEFAULT_OFFSET = 0;
const PRODUCTS_DEFAULT_LIMIT = 8;

const findProducts = (query) => {
  const { offset, limit, ...fields } = query;
  return prisma.products.findMany({
    include: {
      product_images: {
        select: {
          image_url: true,
          product_image_types: true,
        },
        where: {
          product_image_types: {
            name: {
              equals: "thumbnail",
            },
          },
        },
      },
    },
    skip: Number(offset) || PRODUCTS_DEFAULT_OFFSET,
    take: Number(limit) || PRODUCTS_DEFAULT_LIMIT,
  });
};

const findDetailInfo = async (fields) => {
  const { product_id, user_id, query } = fields;
  const { offset, limit } = query;
  const value = Number(product_id);

  const getDetailInfo = prisma.products.findUnique({
    where: { id: value },
    include: {
      product_images: {
        select: {
          image_url: true,
          product_image_types: true,
        },
      },
      reviews: {
        select: {
          id: true,
          users: {
            select: {
              username: true,
            },
          },
          contents: true,
          review_rate: true,
          liked_num: true,
          isLiked: true,
          created_at: true,
        },
        skip: Number(offset) || PRODUCTS_DEFAULT_OFFSET,
        take: Number(limit) || PRODUCTS_DEFAULT_LIMIT,
        orderBy: {
          liked_num: "desc",
        },
      },
      recent_views: {
        where: {
          product_id: {
            not: value,
          },
        },
        select: {
          products: {
            select: {
              name: true,
              price: true,
              product_images: {
                select: {
                  image_url: true,
                  product_image_types: true,
                },
                where: {
                  product_image_types: {
                    name: {
                      equals: "thumbnail",
                    },
                  },
                },
              },
            },
          },
        },
        skip: Number(offset) || PRODUCTS_DEFAULT_OFFSET,
        take: Number(limit) || PRODUCTS_DEFAULT_LIMIT,
        orderBy: {
          viewed_at: "desc",
        },
      },
    },
  });

  const addToRecentViews = prisma.recent_views.create({
    data: {
      user_id,
      product_id: value,
    },
  });

  await prisma.$transaction([getDetailInfo, addToRecentViews]);
  return getDetailInfo;
};

module.exports = { findProducts, findDetailInfo };
