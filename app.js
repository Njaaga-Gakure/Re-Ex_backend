require("dotenv").config();
require("express-async-errors");
const express = require("express");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const authRouter = require("./routes/auth");
const financialRouter = require("./routes/financials");
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/financials", authenticateUser, financialRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}... :)`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
