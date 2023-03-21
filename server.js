require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const authMiddleware = require("./middlewares/auth");

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = "http://localhost:3000";

// Global Use
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
const connectDb = require("./databaseConnect/connect");

// Routes
const authRoute = require("./routes/auth");
app.use("/votify/api/v1", authRoute);
const electionRoute = require("./routes/election");
app.use("/votify/api/v1", electionRoute);
const ballotRoute = require("./routes/ballot");
app.use("/votify/api/v1", ballotRoute);
const votedRoute = require("./routes/voted");
app.use("/votify/api/v1", votedRoute);
const userRoute = require("./routes/user");
app.use("/votify/api/v1", userRoute);
const uploadRoute = require("./routes/upload");
app.use("/votify/api/v1", uploadRoute);
const mailer = require("./routes/email");
app.use("/votify/api/v1", mailer);

// MiddleWares
const notFoundMiddleWare = require("./middlewares/not_found");
app.use(notFoundMiddleWare);
const errorHandler = require("./middlewares/error_handler");
app.use(errorHandler);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (err) {
    console.log("db connection error", err);
  }
};

start();
