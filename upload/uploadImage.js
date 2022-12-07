const multer = require("multer");
const mkdirp = require("mkdirp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/products/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const limits = {
  //files: 1, // allow only 1 file per request
  fileSize: 1024 * 1024 * 2,
};

const fileFilter = function (req, file, cb) {
  const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only jpg, png and gif image files are allowed."
      )
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits,
});
module.exports = upload;
