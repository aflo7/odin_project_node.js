var Author = require("../models/author")
const async = require("async")
const Book = require("../models/book")

exports.author_list = (req, res, next) => {
  Author.find()
    .sort({ title: 1 })
    .exec((err, author_list) => {
      if (err) {
        next(err)
      }
      res.render("author_list", {
        title: "Author List",
        author_list: author_list
      })
    })
}

// Display detail page for a specific Author.
exports.author_detail = (req, res, next) => {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.params.id).exec(callback)
      },
      authors_books(callback) {
        Book.find({ author: req.params.id }, "title summary").exec(callback)
      }
    },
    (err, results) => {
      if (err) {
        // Error in API usage.
        return next(err)
      }
      if (results.author == null) {
        // No results.
        const err = new Error("Author not found")
        err.status = 404
        return next(err)
      }

      console.log(results)
      // Successful, so render.
      res.render("author_detail", {
        title: "Author Detail",
        author: results.author,
        author_books: results.authors_books
      })
    }
  )
}

// get the form that will confirm deletion of the author
// display the authors info and some of their books if they have any
exports.author_delete_get = function (req, res, next) {
  async.parallel(
    {
      Author: function (cb) {
        Author.findById(req.params.id, cb)
      },
      AuthorsBooks: function (cb) {
        Book.find({ author: req.params.id }, cb)
      }
    },
    function (err, result) {
      if (err) {
        return next(err)
      }
      res.render("author_delete_get", {
        title: "Author Delete",
        author: result.Author,
        authorBooks: result.AuthorsBooks
      })
    }
  )
}

// Handle Author delete on POST.
// we won't allow an author to be deleted if it is referenced by a book
// this only works if no books reference the author
exports.author_delete_post = (req, res, next) => {
  Author.findByIdAndRemove(req.params.id, function (err, result) {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
}

exports.author_create_get = (req, res, next) => {
  res.render("createAuthorForm")
}

exports.author_create_post = (req, res, next) => {
  const newAuthor = new Author({
    first_name: req.body.first_name,
    family_name: req.body.family_name,
    date_of_birth: new Date(req.body.date_of_birth),
    date_of_death: new Date(req.body.date_of_death)
  })
  // here is the logic to create a new author to the db
  newAuthor.save(function (err, result) {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
}
