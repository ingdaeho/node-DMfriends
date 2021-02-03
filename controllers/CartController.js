const { CartService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");

const getCartItems = errorWrapper(async (req, res) => {
  const { userId } = req.params;
  const { id: userIdFromToken } = req.foundUser;
  const { query } = req;

  if (Number(userId) !== userIdFromToken)
    errorGenerator({ statusCode: 403, message: "Unauthorized" });

  const cartItems = await CartService.getItems({
    user_id: userIdFromToken,
    query,
  });
  res.status(200).json({ cartItems });
});

const addItem = errorWrapper(async (req, res) => {
  const { userId } = req.params;
  const { id: userIdFromToken } = req.foundUser;
  const { product_id, quantity, price } = req.body;

  if (Number(userId) !== userIdFromToken)
    errorGenerator({ statusCode: 403, message: "Unauthorized" });

  const foundCart = await CartService.findCart({
    user_id: userIdFromToken,
    product_id,
  });

  if (!foundCart) {
    const itemAdded = await CartService.addItem({
      user_id: userIdFromToken,
      product_id,
      quantity,
      price,
    });
    res.status(201).json({ itemAdded });
  }

  if (foundCart && foundCart.product_id === product_id) {
    const { id: cartId } = foundCart;
    const itemAdded = await CartService.addItem({
      cartId,
      user_id: userIdFromToken,
      product_id,
      quantity,
      price,
    });
    res.status(201).json({ itemAdded });
  }

  if (foundCart && foundCart.product_id !== product_id) {
    const itemAdded = await CartService.addItem({
      user_id: userIdFromToken,
      product_id,
      quantity,
      price,
    });
    res.status(201).json({ itemAdded });
  }
});

const changeQuantity = errorWrapper(async (req, res) => {
  const { userId } = req.params;
  const { id: userIdFromToken } = req.foundUser;
  const { quantity, product_id } = req.body;

  if (Number(userId) !== userIdFromToken)
    errorGenerator({ statusCode: 403, message: "Unauthorized" });

  const foundCart = await CartService.findCart({
    user_id: userIdFromToken,
    product_id,
  });
  const { id: idFromCart } = foundCart;

  const changedQuantity = await CartService.changeProductValue({
    id: idFromCart,
    quantity,
  });
  res.status(201).json({ changedQuantity });
});

const deleteOneItem = errorWrapper(async (req, res) => {
  const { userId } = req.params;
  const { id: userIdFromToken } = req.foundUser;
  const { product_id } = req.body;

  if (Number(userId) !== userIdFromToken)
    errorGenerator({ statusCode: 403, message: "Unauthorized" });

  const foundCart = await CartService.findCart({
    user_id: userIdFromToken,
    product_id,
  });
  const { id: idFromCart } = foundCart;

  const deletedSelectedItem = await CartService.deleteSelectedItem({
    id: idFromCart || 1,
    product_id,
  });
  res.status(201).json({ deletedSelectedItem });
});

const deleteAllItems = errorWrapper(async (req, res) => {
  // 한개의 endpoint로 구현 가능?
  const { userId } = req.params;
  const { id: userIdFromToken } = req.foundUser;

  if (Number(userId) !== userIdFromToken)
    errorGenerator({ statusCode: 403, message: "Unauthorized" });

  const deletedAllItems = await CartService.deleteAllItems({
    user_id: userId,
  });
  res.status(201).json({ deletedAllItems });
});

module.exports = {
  getCartItems,
  addItem,
  changeQuantity,
  deleteOneItem,
  deleteAllItems,
};
