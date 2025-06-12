require("dotenv").config();

const envVars = {
  MONOG_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  API_TOKEN:process.env.API_TOKEN,
};

module.exports = envVars;
