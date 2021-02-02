const { CartService } = require("../services");
const { errorWrapper } = require("../errors");

const getCartItems = errorWrapper(async (req, res) => {
  const cartItems = await CartService.getItems(req.query);
  res.status(200).json({ cartItems });
});

const addItem = errorWrapper(async (req, res) => {
  // user_id는 params or token 어디서 받아서 써야하는지?
  const { id: user_id } = req.foundUser;
  const { product_id, quantity, price } = req.body;

  const itemAdded = await CartService.addItem({
    user_id,
    product_id,
    quantity,
    price,
  });

  res.status(201).json({ itemAdded });
});

const changeQuantity = errorWrapper(async (req, res) => {
  // product_id, price는 프론트에서 다시 받아야하는게 맞는건지?
  const { id: user_id } = req.foundUser; // user_id를 쓰지 않았는데 ?
  const { cartId: cart_id } = req.params;
  const { quantity } = req.body;

  const changedQuantity = await CartService.changeProductValue({
    cart_id,
    quantity,
  });
  res.status(200).json({ changedQuantity });
});

const deleteOneItem = errorWrapper(async (req, res) => {
  const { cartId: cart_id } = req.params;

  const deletedSelectedItem = await CartService.deleteSelectedItem({ cart_id });
  res.status(201).json({ deletedSelectedItem });
});

const deleteAllItems = errorWrapper(async (req, res) => {
  const { cartId: cart_id } = req.params;

  const deletedAllItems = await CartService.deleteAllItems();
  res.status(201).json({ deletedAllItems });
});

module.exports = {
  getCartItems,
  addItem,
  changeQuantity,
  deleteOneItem,
  deleteAllItems,
};
