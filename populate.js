require("dotenv").config();
const Financial = require("./models/Financial");
const mockData = require("./mock-data.json");
const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connect to the database was successful");
    await Financial.deleteMany();
    await Financial.create(mockData);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

start();
