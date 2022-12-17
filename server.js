require("dotenv").config();
const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
// static file
app.use(express.static(path.join(__dirname, "public")));

// flash

app.use(cookieParser("ytuutuutrururru"));
app.use(
  session({
    secret: "sfffweffwefwrwenwfjwerg",
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);
app.use(flash());

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
// Middleware
app.use(express.json());

// Routes

app.use("/user", require("./routes/userRoutes"));
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
