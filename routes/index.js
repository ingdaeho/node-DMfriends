const express = require("express");
const router = express.Router();

const UserRouter = require("./UserRouter");
const FeedRouter = require("./FeedRouter");
const ProductRouter = require("./ProductRouter");

router.use("/users", UserRouter);
router.use("/feeds", FeedRouter);
router.use("/products", ProductRouter);

module.exports = router;
