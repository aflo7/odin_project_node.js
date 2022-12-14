var Genre = require("../models/genre")
var Book = require("../models/book")
var async = require("async")

// Display list of all Genre.
exports.genre_list = function (req, res, next) {
  Genre.find()
    .sort({ name: 1 })
    .exec((err, genres) => {
      if (err) {
        return next(err)
      }
      res.render("genre_list", { title: "Genres", genres: genres })
    })
}

// Display detail page for a specific Genre.

exports.genre_detail = function (req, res, next) {
  async.parallel(
    {
      genre: function (cb) {
        Genre.findById(req.params.id, cb)
      },
      booksWithGenre: function (cb) {
        Book.find({ genre: req.params.id }, cb)
      }
    },
    function (err, result) {
      if (err) {
        return next(err)
      }

      res.render("genre_detail", {
        genre: result.genre,
        booksWithGenre: result.booksWithGenre
      })
    }
  )
}
// Display Genre create form on GET.
exports.genre_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre create GET")
}

// Handle Genre create on POST.
exports.genre_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre create POST")
}

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete GET")
}

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete POST")
}

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update GET")
}

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update POST")
}
