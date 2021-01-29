const prisma = require("../prisma");
const { makeQueryOption } = require("../utils");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

// const getItems = (query) => {
//   const { offset, limit, ...fields } = query;
//   const where = makeQueryOption(fields);

//   return prisma.cart.findMany({
//     where,
//     skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
//     take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
//     orderBy: {
//       created_at: "desc",
//     },
//   });
// };

const addItem = (fields) => {
  const { userId: user_id, productId: product_id, ...dataFields } = fields;
  return prisma.cart.create({
    data: {
      ...dataFields,
      user_id,
      product_id,
    },
  });
};

module.exports = {
  //   findItems,
  addItem,
};
