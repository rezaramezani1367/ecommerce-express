require("dotenv").config();
const path = require('path');
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
// static file
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/products", require("./routes/productRoutes"));

// Error Handler
app.use(errorHandler);

// not found route
app.all("*", async (req, res, next) => {
  res.send(
    "<h1 style='text-align: center ;margin-top:200;color:red;text-transform:capitalize'>page not found</h1>"
  );
});
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
