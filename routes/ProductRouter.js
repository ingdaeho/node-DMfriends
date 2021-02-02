const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers");
const validateToken = require("../middlewares/validateToken");

router.get("/", ProductController.getProducts);
router.get("/:productId", validateToken, ProductController.getOneProduct);

module.exports = router;
