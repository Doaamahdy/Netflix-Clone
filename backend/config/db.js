const mongoose = require('mongoose');
const envVars = require("../config/envVars");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(envVars.MONOG_URL);
    console.log("successfully coneected to Database");
  } catch (err) {
    console.log("Error Connecting toi the database ", err);
  }
};

module.exports = connectDB;
