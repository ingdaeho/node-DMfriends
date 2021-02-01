const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers");

router.get("/", ProductController.getProducts);
router.get("/:productId", ProductController.getOneProduct);

module.exports = router;
