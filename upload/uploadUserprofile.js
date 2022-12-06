const multer = require("multer");
const mkdir = require("mkdirp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdir("./public/profile/images").then((made) => {
      cb(null, "./public/products/images");
    });
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
