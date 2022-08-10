var Author = require("../models/author")

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
