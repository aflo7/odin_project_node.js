var express = require("express")
var router = express.Router()
var mongoose = require("mongoose")

// models needed to query database
var Author = require("../models/author")
var Book = require("../models/book")
var BookInstance = require("../models/book")
var Genre = require("../models/book")

// every route in this file with start with '/catalog'
router.get("/", function (req, res) {
  res.send("catalog home page")
})

router.get("/book", (req, res) => {
  // made code easier to read
  Book.find(function (err, result) {
    if (err) return console.error(err)

    return res.send(result)
  })
})

router.get("/author", (req, res) => {
  Author.find((err, result) => {
    if (err) return console.error(err)

    return res.send(result)
  })
})

router.get("/bookinstance", (req, res) => {
  BookInstance.find((err, result) => {
    if (err) return console.error(err)

    return res.send(result)
  })
})

router.get("/genre", (req, res) => {
  Genre.find((err, result) => {
    if (err) return console.error(err)

    return res.send(result)
  })
})

router.get("/:object/:id", function (req, res) {
  res.send("/:object/:id")
})

module.exports = router
