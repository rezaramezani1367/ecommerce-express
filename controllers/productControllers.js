const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.find({}, { numReviews: 0 });
  // res.status(200).json({
  //   success: true,
  //   data: product,
  // });
  res.render("products/allProducts", {
    path: "/api/v1/products",
    pageTitle: "All Products",
    product,
  });
});
exports.getOneProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.createNewProductForm = asyncHandler(async (req, res, next) => {
  res.render("products/createProducts", {
    path: "/api/v1/products/create",
    pageTitle: "Add Product",
  });
});
exports.createNewProduct = async (req, res, next) => {
  // console.log(req.body);
  const product = await Product.create(req.body);

  // res.status(201).json({
  //   success: true,
  //   data: product,
  // });
  res.redirect("/api/v1/Products/");
};

exports.updateProductById = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product with id ${req.params.id} was not found`, 404)
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

exports.deleteProductById = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product with id ${req.params.id} was not found`, 404)
    );
  }

  await product.remove();
  product = await Product.find({});
  res.redirect("/api/v1/Products/");
  // res.status(200).json({
  //   success: true,
  //   data: product,
  // });
});
