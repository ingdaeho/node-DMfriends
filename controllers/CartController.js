const { CartService } = require("../services");
const { errorWrapper, errorGenerator } = require("../errors");

const getCartItems = errorWrapper(async (req, res) => {
  const cartItems = await CartService.getItems(req.query);
  res.status(200).json({ cartItems });
});

const addItem = errorWrapper(async (req, res) => {
  //   const { userId } = req.params;
  const { id: userId } = req.foundUser;
  const { productId, quantity, price } = req.body;

  const itemAdded = await CartService.addItem({
    userId,
    productId,
    quantity,
    price,
  });

  res.status(201).json({ itemAdded });
});

const changeQuantity = () => {};

const deleteOneItem = () => {};

const deleteAllItems = () => {};

module.exports = {
  getCartItems,
  addItem,
  changeQuantity,
  deleteOneItem,
  deleteAllItems,
};
