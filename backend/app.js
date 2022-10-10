const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//route imports
const user = require("./routes/userRoute");
const users = require("./controllers/usersController");

const studentpayment = require("./routes/student_pay_R.js");
const teachSal = require("./routes/teacher_sal_route.js");

const postClass = require('./routes/classRoutes');
const postNotice = require('./routes/noticeRoutes');

app.use("/api/v1", user);
app.use("/api/v1", users);
app.use( studentpayment);
app.use( teachSal);
app.use(postClass);
app.use(postNotice);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//middleware for errors
app.use(errorMiddleware);

module.exports = app;
