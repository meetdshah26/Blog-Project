const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const createError = require("http-errors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API ROUTES
app.use("/api/articles", require("./routes/articleRoutes"));

app.all("*", (req, res, next) => {
  next(createError(404, `Can't find ${req.originalUrl} on this server!`));
});

// Custom error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "An unexpected error occurred!",
  });
});

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
