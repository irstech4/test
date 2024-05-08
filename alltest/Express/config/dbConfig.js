// dbConfig.js
const mongoose = require("mongoose");

const config = {
  mongoURI: process.env.DATABASE_URI || "mongodb://express-mongo-1:27017/hello",
};

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(config.mongoURI);

    console.log("Connected to MongoDB:", connection.connection.name);
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
