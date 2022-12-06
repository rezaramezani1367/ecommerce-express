const express = require("express");
const productControllers = require("../controllers/productControllers");
const router = express.Router();

// @route - /api/v1/Products/
router.route("/").get(productControllers.getAllProducts);
// @route - /api/v1/Products/create
router
  .route("/create/")
  .get(productControllers.createNewProductForm)
  .post(productControllers.createNewProduct);

// @route - /api/v1/Products/someid
router
  .route("/:id")
  .get(productControllers.getOneProduct)
  .put(productControllers.updateProductById)
  .delete(productControllers.deleteProductById);

module.exports = router;
