const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { UserController, CartController } = require("../controllers");
const { validateToken } = require("../middlewares");

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isStrongPassword(),
  UserController.signUp
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isStrongPassword(),
  UserController.logIn
);

// cart
router.get("/:userId/cart", CartController.getCartItems);
router.post("/:userId/cart", validateToken, CartController.addItem);
router.put(
  "/:userId/cart/:cartId",
  validateToken,
  CartController.changeQuantity
);
router.delete(
  "/:userId/cart/:cartId",
  validateToken,
  CartController.deleteOneItem
);
router.delete("/:userId/cart", validateToken, CartController.deleteAllItems);

module.exports = router;
