var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
require("dotenv").config()
var indexRouter = require("./routes/index")
var catalogRouter = require("./routes/catalog")
const compression = require('compression');
var app = express()

//Import the mongoose module
var mongoose = require("mongoose")

//Set up default mongoose connection
var mongoDB = `mongodb+srv://andres-owner:${process.env.ENCODED}@cluster0.bg92a.mongodb.net/local_library?retryWrites=true&w=majority`
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
// mongodb+srv://andres-owner:November20@2@cluster0.bg92a.mongodb.net/local_library?retryWrites=true&w=majority
//Get the default connection
var db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"))

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
app.use(compression()); //Compress all routes, make requests faster
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/catalog", catalogRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})
;(module.exports = app), db
