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

  const addItemInput = {
    user_id: userIdFromToken,
    product_id,
    quantity,
    price,
    cartId: foundCart?.product_id === product_id && foundCart.id,
  };

  const itemAdded = await CartService.addItem(addItemInput);
  res.status(201).json({ itemAdded });
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

const deleteChosenItem = errorWrapper(async (req, res) => {
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
  deleteChosenItem,
  deleteAllItems,
};
