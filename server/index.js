const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");

const Port = 8800;
const app = express();
app.use(express.json());
app.use(morgan("common"));

// ROUTES ASSIGMENT
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

// MONGODB connection
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("db connected");
});
mongoose.connection.on("error", (err) => {
  console.log(`DB Error: ${err.message}`);
});

// ROUTES Configuration

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(Port, () => {
  console.log(`app is listening at ${Port}`);
});
