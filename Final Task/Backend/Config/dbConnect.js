const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    // Connect to database
    mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("Database Connected Successfully");
    });
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = dbConnect;
