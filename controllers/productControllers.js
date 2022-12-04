const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllProducts = asyncHandler(async (req, res, next) => {});

exports.createNewProduct = asyncHandler(async (req, res, next) => {});

exports.updateProductById = asyncHandler(async (req, res, next) => {});

exports.deleteProductById = asyncHandler(async (req, res, next) => {});
