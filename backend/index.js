require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const enVars = require("./config/envVars");
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.route");
const movieRouter = require("./routes/movie.route");
const tvRouter = require("./routes/tv.route");
const searchRouter = require("./routes/search.route");
const protectRoute = require("./middlewares/protectRoute");

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ success: "success" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", protectRoute, movieRouter);
app.use("/api/v1/tv", protectRoute, tvRouter);
app.use("/api/v1/search", protectRoute, searchRouter);

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(enVars.PORT || 5000, () => {
      console.log(`Server running on port ${enVars.PORT || 5000}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
