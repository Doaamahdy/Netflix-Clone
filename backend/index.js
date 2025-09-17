require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const enVars = require("./config/enVars");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.route");
const movieRouter = require("./routes/movie.route");
const tvRouter = require("./routes/tv.route");
const searchRouter = require("./routes/search.route");
const protectRoute = require("./middlewares/protectRoute");
const app = express();

const __direname = path.resolve();
console.log(__direname);

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", protectRoute, movieRouter);
app.use("/api/v1/tv", protectRoute, tvRouter);
app.use("/api/v1/search", protectRoute, searchRouter);

if (enVars.NODE_ENV === "production") {
  console.log("production");
  app.use(express.static(path.join(__direname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(enVars.PORT, () => {
  console.log(`Listening to the server ${enVars.PORT}`);
  connectDB();
});
