const mongoose = require("mongoose");
const enVars = require("../config/enVars");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(enVars.MONOG_URL);
    console.log("successfully coneected to Database");
  } catch (err) {
    console.log("Error Connecting toi the database ", err);
  }
};

module.exports = connectDB;
