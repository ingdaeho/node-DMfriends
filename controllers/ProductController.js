const { ProductService } = require("../services");
const { errorWrapper } = require("../errors");

const getProducts = errorWrapper(async (req, res) => {
  const products = await ProductService.findProducts(req.query);
  res.status(200).json({ products });
});

const getOneProduct = errorWrapper(async (req, res) => {
  const { productId } = req.params;
  const productDetail = await ProductService.findDetailInfo({
    product_id: productId,
  });
  res.status(200).json({ productDetail });
});

module.exports = { getProducts, getOneProduct };
