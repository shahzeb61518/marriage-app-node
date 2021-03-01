const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const socket = require("socket.io");

const chatController = require("./controllers/chat-controller");
const createChat = chatController.createChat;
const getChat = chatController.getPreChat;

// Load env vars
dotenv.config({ path: "./config/config.env" });

// // Connect to database
// connectDB();

// Route files
const auth = require("./routes/auth");
const users = require("./routes/users");
const userProfile = require("./routes/userProfile");
const payment = require("./routes/payment");
const chat = require("./routes/chat-routes");

const app = express();

const url = process.env.MONGODB_PATH;
//  "mongodb+srv://bcpplatform:timbcpplatform@cluster0.rfhb0.mongodb.net/bcpplatform?retryWrites=true&w=majority"

mongoose.connect(url, (err, db) => {
  if (err) throw console.log("err>>>", err);
  console.log("DB is Connected");
});

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, // 10 mins
//   max: 100,
// });
// app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/userprofile", userProfile);
app.use("/api/pay", payment);
app.use("/api/chat", chat);

app.use(errorHandler);

// const PORT = process.env.PORT || 4000;

// const server = app.listen(4001);
var port = process.env.PORT || 4001;
var server = app.listen(port, () =>
  console.log(`Node API listening on port ${port}`)
);

const io = socket(server);
io.on("connection", (socket) => {
  console.log("Socket is online!");
  // for chatting
  socket.on("chat-message", (message) => {
    console.log("message", message);
    createChat(message).then((sentMsg) => {
      // console.log("sentMsg", sentMsg);
      // const receivers = msg.owner + "//" + msg.buyer;
      // msg.user_id = sentMsg.user_id;
      io.sockets.emit("chat-message", {
        message,
        // senderId: sentMsg.senderId,
        // recieverId: sentMsg.recieverId,
      });
    });
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
