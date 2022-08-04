var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
var catalogRouter = require("./routes/catalog")

var app = express()

//Import the mongoose module
var mongoose = require("mongoose")

// import the models
var Author = require("./models/author")
var Book = require("./models/book")
var BookInstance = require("./models/book")
var Genre = require("./models/book")

//Set up default mongoose connection
var mongoDB =
  "mongodb+srv://andres-owner:November20%402@cluster0.bg92a.mongodb.net/local_library?retryWrites=true&w=majority"
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

const createAuthor = (first_name, family_name, date_of_birth) => {
  if (!first_name || !family_name || !date_of_birth) {
    return
  }
  var authorToBeAdded = new Author({
    first_name: first_name,
    family_name: family_name,
    date_of_birth: date_of_birth
  })

  Author.findOne(
    // if author exists, don't create
    { first_name: first_name, family_name: family_name },
    (err, authorThatWasFound) => {
      if (authorThatWasFound) {
        console.log("that author already exists... cannot create")
        return
      }

      authorToBeAdded.save((err) => {
        if (err) {
          console.log("error saving author")
          return console.error(err)
        }

        console.log("creating new author..." + first_name)
      })
    }
  )
}

// createAuthor(
//   (first_name = "Cool"),
//   (family_name = "H"),
//   (date_of_birth = Date.now())
// )

// stephen king author id = 62ebdbdd34b6002a07704dee
// fantasy genre id = 62ebd5297c4018e29bc1a962
// science fiction genre id = 62ebd5297c4018e29bc1a964
// french poetry genre id = 62ebd5297c4018e29bc1a966

//Get the default connection
var db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"))

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)
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
