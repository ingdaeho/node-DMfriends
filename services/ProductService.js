const prisma = require("../prisma");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

const findProducts = () => {
  // limit ofset
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
  });
};

const findDetailInfo = (query) => {
  // product_id params
  const { product_id, offset, limit } = query;
  const value = Number(product_id);
  return prisma.products.findUnique({
    where: { id: value },
    include: {
      product_images: {
        select: {
          image_url: true,
          product_image_types: true,
        },
      },
      reviews: {
        skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
        take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
        orderBy: {
          liked_num: "desc",
        },
      },
      recent_views: {
        include: {
          // 현재 상품 제거
          products: true,
        },
        skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
        take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
        orderBy: {
          viewed_at: "desc",
        },
      },
    },
  });
  // prisma.recent_views.create({
  //   data: {
  //     user_id: 2,
  //     product_id: Number(product_id),
  //   },
  // })
};

module.exports = { findProducts, findDetailInfo };
