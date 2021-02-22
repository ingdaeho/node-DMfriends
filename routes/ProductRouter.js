const express = require("express");
const router = express.Router();
const { ProductController } = require("../controllers");
const validateToken = require("../middlewares/validateToken");

router.get("/", ProductController.getProducts);
router.get("/:productId", validateToken, ProductController.getOneProduct);
router.get(
  "/:productId/recentViews",
  validateToken,
  ProductController.getRecentViews
);

module.exports = router;
