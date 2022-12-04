const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.find({},{numReviews:0});
  res.status(200).json({
    success: true,
    data: product,
  });
});
exports.getOneProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.createNewProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

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

  res.status(200).json({
    success: true,
    data: product,
  });
});
