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