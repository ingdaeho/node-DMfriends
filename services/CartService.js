const prisma = require("../prisma");

const ARTICLES_DEFAULT_OFFSET = 0;
const ARTICLES_DEFAULT_LIMIT = 5;

const getItems = (query) => {
  const { offset, limit } = query;

  return prisma.cart.findMany({
    skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
    orderBy: {
      created_at: "desc",
    },
  });
};

const addItem = (fields) => {
  const { user_id, product_id, quantity, price } = fields;
  return prisma.cart.create({
    data: {
      user_id,
      product_id: Number(product_id),
      quantity: Number(quantity),
      price: Number(price),
    },
  });
};

const changeProductValue = (fields) => {
  const { cart_id, quantity } = fields;
  return prisma.cart.update({
    where: { id: Number(cart_id) },
    data: {
      quantity,
    },
  });
};

const deleteSelectedItem = ({ cart_id }) => {
  return prisma.cart.delete({
    where: { id: Number(cart_id) },
  });
};

const deleteAllItems = () => {
  return prisma.cart.deleteMany({});
};

module.exports = {
  getItems,
  addItem,
  changeProductValue,
  deleteSelectedItem,
  deleteAllItems,
};
