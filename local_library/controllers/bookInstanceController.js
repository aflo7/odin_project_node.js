var BookInstance = require("../models/bookinstance")

exports.book_instance_list = (req, res, next) => {
  BookInstance.find()
  .populate("book")
  .exec((err, bookInstanceList) => {
    if (err) {
      next(err)
    }

    console.log(bookInstanceList)
    res.render("bookinstance_list", {
      title: "Book Instance List",
      bookInstanceList: bookInstanceList
    })
  })
}

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec((err, bookinstance) => {
      if (err) {
        return next(err);
      }
      if (bookinstance == null) { // No results.
        const err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render('bookinstance_detail', {
        title: `Copy: ${bookinstance.book.title}`,
        bookinstance,
      });
    });
};
