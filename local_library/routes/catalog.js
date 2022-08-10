var express = require("express")
var router = express.Router()
var mongoose = require("mongoose")

// models needed to query database
var Author = require("../models/author")
var Book = require("../models/book")
var BookInstance = require("../models/bookinstance")
var Genre = require("../models/genre")

// controllers with all logic
var bookController = require("../controllers/bookController")
var bookInstanceController = require("../controllers/bookInstanceController")
var authorControl = require("../controllers/authorController")
var genreController = require("../controllers/genreController")

// every route in this file with start with '/catalog'

router.get("/", bookController.index)

router.get("/book", bookController.book_list)

router.get("/author", authorControl.author_list)

router.get("/bookInstance", bookInstanceController.book_instance_list)

router.get("/genre", genreController.genre_list)
router.get('/genre/:id', genreController.genre_detail)

// router.get("/book/:id", (req, res) => {
//   Book.find(function (err, result) {
//     if (err) {
//       return console.error(err)
//     }
//     if (!result[req.params.id - 1]) {
//       return console.error(err)
//     }
//     return res.send(result[req.params.id - 1])
//   })
// })

router.get("/author/create", (req, res) => {
  res.render("createAuthorForm")
})
router.post("/author/createNew", (req, res) => {
  if (
    !req.body.first_name ||
    !req.body.family_name ||
    !req.body.date_of_birth ||
    !req.body.date_of_death
  ) {
    return console.error("all fields must be filled in")
  }
  var newAuthor
  try {
    newAuthor = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: new Date(req.body.date_of_birth),
      date_of_death: new Date(req.body.date_of_death)
    })
  } catch (error) {
    return console.error(error)
  }
  // here is the logic to create a new author to the db
  newAuthor.save().then((savedDoc) => {
    if (!savedDoc) {
      return console.error("savedDoc is not defined")
    }
    return res.redirect("/")
  })
})
// router.delete("/book/delete/:id", (req, res) => {})
module.exports = router
