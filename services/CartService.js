const prisma = require("../prisma");

const PRODUCTS_DEFAULT_OFFSET = 0;
const PRODUCTS_DEFAULT_LIMIT = 5;

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
    select: {
      products: {
        select: {
          name: true,
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
      quantity: true,
      price: true,
    },
    skip: Number(offset) || PRODUCTS_DEFAULT_OFFSET,
    take: Number(limit) || PRODUCTS_DEFAULT_LIMIT,
    orderBy: {
      created_at: "desc",
    },
  });
};

const addItem = async (fields) => {
  const { user_id, product_id, quantity, price } = fields;
  const foundCart = await prisma.cart.findFirst({
    where: {
      user_id,
      product_id,
      deleted_at: null,
    },
  });

  if (!foundCart)
    return prisma.cart.create({
      data: {
        product_id,
        user_id,
        quantity,
        price,
      },
    });

  if (foundCart)
    return prisma.cart.update({
      where: {
        id: foundCart.id,
      },
      data: {
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
  const { product_id, user_id } = fields;
  console.log(product_id);
  return prisma.cart.updateMany({
    where: {
      user_id: Number(user_id),
      product_id,
      deleted_at: null,
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

module.exports = {
  findCart,
  getItems,
  addItem,
  changeProductValue,
  deleteSelectedItem,
};
