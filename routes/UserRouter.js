const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { UserController } = require("../controllers");
const errorGenerator = require("../errors/errorGenerator");

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  // .custom((value, { req }) => {
  //   if (value !== req.body.confirm_password) {
  //     errorGenerator({
  //       message: "Password confirmation does not match password",
  //     });
  //   }
  //   return true;
  // }),
  UserController.signUp
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  UserController.logIn
);

// router.get("/:userId/cart");
// router.post("/:userId/cart");
// router.delete("/:userId/cart");

module.exports = router;
