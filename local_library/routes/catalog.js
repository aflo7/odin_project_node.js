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
var authorController = require("../controllers/authorController")
var genreController = require("../controllers/genreController")

// every route in this file with start with '/catalog'

router.get("/", bookController.index)

router.get('/book/createNew', bookController.book_create_get)
router.post('/book/createNew', bookController.book_create_post)
router.get("/book", bookController.book_list)
router.get("/book/:id", bookController.book_detail)

router.get("/author/delete/:id", authorController.author_delete_get)
router.post("/author/delete/:id", authorController.author_delete_post)
router.get("/author/createNew", authorController.author_create_get)
router.post("/author/createNew", authorController.author_create_post)
router.get("/author", authorController.author_list)
router.get("/author/:id", authorController.author_detail)

router.get("/bookInstance", bookInstanceController.book_instance_list)
router.get("/bookInstance/:id", bookInstanceController.bookinstance_detail)

router.get("/genre", genreController.genre_list)
router.get("/genre/:id", genreController.genre_detail)

// router.delete("/book/delete/:id", (req, res) => {})
module.exports = router
