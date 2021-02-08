const { ProductService } = require("../services");
const { errorWrapper } = require("../errors");

const getProducts = errorWrapper(async (req, res) => {
  const products = await ProductService.findProducts(req.query);
  res.status(200).json({ products });
});

const getOneProduct = errorWrapper(async (req, res) => {
  const { id: userIdFromToken } = req.foundUser;
  const { productId } = req.params;
  const { query } = req;

  const productDetail = await ProductService.findDetailInfo({
    product_id: productId,
    user_id: userIdFromToken,
    query,
  });
  res.status(200).json({ productDetail });
});

const getRecentViews = errorWrapper(async (req, res) => {
  const { id: userIdFromToken } = req.foundUser;
  const { productId } = req.params;
  const { query } = req;

  const recentViews = await ProductService.findRecentViews({
    product_id: productId,
    user_id: userIdFromToken,
    query,
  });
  res.status(200).json({ recentViews });
});

module.exports = { getProducts, getOneProduct, getRecentViews };
