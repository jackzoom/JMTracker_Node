const express = require("express");
// const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const debug = require("debug")("app:server");
var routes = require("./routes/index");
var app = express();
//创建数据库连接
mongoose.connect("mongodb://localhost/jmtracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on("error", function() {
  debug("mongodb error");
});
db.once("open", function() {
  debug(`Mongodb opened`);
});
// app.use(logger("dev")); //增加控制台日志

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  debug(`Not Found "${req.originalUrl}"`);
  res.sendStatus(404).end();
});

module.exports = app;
