var Book = require("../models/book")
var Author = require("../models/author")
var Genre = require("../models/genre")
var BookInstance = require("../models/bookinstance")

var async = require("async")

// displays the number of Author, Book, BookInstance, and Genre in db
exports.index = function (req, res, next) {
  async.parallel(
    {
      book_count(callback) {
        Book.countDocuments({}, callback) // Pass an empty object as match condition to find all documents of this collection
      },
      book_instance_count(callback) {
        BookInstance.countDocuments({}, callback)
      },
      book_instance_available_count(callback) {
        BookInstance.countDocuments({ status: "Available" }, callback)
      },
      author_count(callback) {
        Author.countDocuments({}, callback)
      },
      genre_count(callback) {
        Genre.countDocuments({}, callback)
      }
    },
    function (err, results) {
      if (err) {
        return next(err)
      }
      res.render("index", {
        title: "Local Library Home",
        error: err,
        countdata: results
      })
    }
  )
}

// Display list of all books.
exports.book_list = function (req, res, next) {
  Book.find()
    .sort({ title: 1 })
    .populate("genre")
    .populate("author")
    .exec((err, books) => {
      if (err) {
        return next(err)
      }
      res.render("book_list", {
        title: "Book List",
        books: books
      })
    })
}

// Display detail page for a specific book.
exports.book_detail = function (req, res, next) {
  async.parallel(
    {
      Book: function (cb) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(cb)
      },
      BookInstances: function (cb) {
        BookInstance.find({ book: req.params.id }, cb)
      }
    },

    function (err, results) {
      if (err) {
        return next(err)
      }
      res.render("book_detail", {
        book: results.Book,
        book_instances: results.BookInstances
      })
    }
  )
}

// Display book create form on GET.
exports.book_create_get = function (req, res, next) {
  async.parallel(
    {
      Genres: (cb) => Genre.find({}, cb),
      Authors: (cb) => Author.find({}, cb)
    },
    (err, result) => {
      if (err) return next(err)
      res.render("createBookForm", {
        genres: result.Genres,
        authors: result.Authors
      })
    }
  )
}

// Handle book create on POST.
exports.book_create_post = function (req, res) {
  // 'genres[]' can be undefined, a string, or an object(array)
  // we need to handle all three cases before we create a new book in the database
  var genres = null // this means no genres were checked

  if (req.body["genres[]"] && !Array.isArray(req.body["genres[]"])) {
    genres = [req.body["genres[]"]]
  } else {
    genres = req.body["genres[]"]
  }

  var book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: genres
  })
  book.save((err, result) => {
    if (err) {
      return next(err)
    }

    res.redirect("/")
  })
  
}

// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET")
}

// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete POST")
}

// Display book update form on GET.
exports.book_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update GET")
}

// Handle book update on POST.
exports.book_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update POST")
}
