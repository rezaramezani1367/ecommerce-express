const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const bootcampSchema = new mongoose.Schema({
  /* name: {
    type: String,
    required: [true, "Please provide a name to the bootcamp"],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, "Please provide a rating for a bootcamp"],
  },
  description: {
    type: String,
    required: [true, "Please provide bootcamp with description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide bootcamp with price"],
  },
  Category: {
    type: String,
    required: [true, "Please compelet  Category"],
  },
  */
});

const Bootcamp = mongoose.model("Bootcamp", bootcampSchema);
// Apply the uniqueValidator plugin to userSchema.
bootcampSchema.plugin(uniqueValidator, {
  message: "{PATH} already exists(must be unique)",
});
module.exports = Bootcamp;
