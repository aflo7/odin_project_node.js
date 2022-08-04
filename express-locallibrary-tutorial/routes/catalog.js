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

router.get("/:object/:id", function (req, res) {
  res.send("/:object/:id")
})

router.get("/book/:id", (req, res) => {})
router.post("/book/create", (req, res) => {})

router.delete("/book/delete/:id", (req, res) => {})
module.exports = router
