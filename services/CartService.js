const prisma = require("../prisma");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

const findCart = (fields) => {
  const { user_id, product_id } = fields;
  return prisma.cart.findFirst({
    where: {
      user_id,
      product_id,
      deleted_at: null,
    },
  });
};

const getItems = (fields) => {
  const { user_id, query } = fields;
  const { offset, limit } = query;
  return prisma.cart.findMany({
    where: {
      user_id,
      deleted_at: null,
    },
    skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      created_at: "desc",
    },
  });
};

const addItem = (fields) => {
  const { cartId, user_id, product_id, quantity, price } = fields;
  return prisma.cart.upsert({
    where: { id: cartId || 1 },
    create: {
      user_id,
      product_id,
      quantity,
      price,
    },
    update: {
      quantity: {
        increment: quantity,
      },
      updated_at: new Date(),
    },
  });
};

const changeProductValue = (fields) => {
  const { id, quantity } = fields;
  return prisma.cart.update({
    where: { id },
    data: {
      quantity,
      updated_at: new Date(),
    },
  });
};

const deleteSelectedItem = (fields) => {
  const { id, product_id } = fields;
  return prisma.cart.updateMany({
    where: {
      id,
      product_id,
      deleted_at: null,
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

const deleteAllItems = (fields) => {
  const { user_id } = fields;
  return prisma.cart.updateMany({
    where: {
      user_id: Number(user_id),
      deleted_at: null,
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

module.exports = {
  getItems,
  addItem,
  changeProductValue,
  deleteSelectedItem,
  deleteAllItems,
  findCart,
};
