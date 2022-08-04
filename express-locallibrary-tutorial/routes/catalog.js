var express = require("express")
var router = express.Router()
var mongoose = require("mongoose")

// models needed to query database
var Author = require("../models/author")
var Book = require("../models/book")
var BookInstance = require("../models/book")
var Genre = require("../models/book")

// every route in this file with start with '/catalog'

// this page displays the number of Author, Book, BookInstance, and Genre in db
router.get("/", function (req, res, next) {
  Author.countDocuments((err, authorCount) => {
    if (err) {
      return console.error(err)
    }

    Book.countDocuments((err, bookCount) => {
      if (err) {
        return console.error(err)
      }
      BookInstance.countDocuments((err, bookInstanceCount) => {
        if (err) {
          return console.error(err)
        }
        Genre.countDocuments((err, genreCount) => {
          if (err) {
            return console.error(err)
          }
          return res.render("index", {
            authorCount: authorCount,
            bookCount: bookCount,
            bookInstanceCount: bookInstanceCount,
            genreCount: genreCount
          })
        })
      })
    })
  })
})

router.get("/book", (req, res) => {
  // made code easier to read
  Book.find(function (err, result) {
    if (err) {
      return console.error(err)
    }

    return res.send(result)
  })
})

router.get("/author", (req, res) => {
  Author.find(function (err, result) {
    if (err) {
      return console.error(err)
    }

    return res.send(result)
  })
})

router.get("/bookInstance", (req, res) => {
  BookInstance.find((err, result) => {
    if (err) {
      return console.error(err)
    }
    return res.send(result)
  })
})

router.get("/genre", (req, res) => {
  Genre.find((err, result) => {
    if (err) {
      return console.error(err)
    }

    return res.send(result)
  })
})

router.get("/book/:id", (req, res) => {
  Book.find(function (err, result) {
    if (err) {
      return console.error(err)
    }
    if (!result[req.params.id - 1]) {
      return console.error(err)
    }
    return res.send(result[req.params.id - 1])
  })
})

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
router.delete("/book/delete/:id", (req, res) => {})
module.exports = router
