var express = require("express")
var router = express.Router()

var messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date().toLocaleDateString()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date().toLocaleDateString()
  },
  {
    text: "Wasup!",
    user: "Andres",
    added: new Date().toLocaleDateString()
  },
  {
    text: "Kill me",
    user: "James",
    added: new Date().toLocaleDateString()
  }
]

/* GET home page. */
// we will output the messages array on the homepage
router.get("/", function (req, res, next) {
  res.render("index", { title: "The Message Board", arr: messages, createNewMessageForm: false, plus:true })
})

// points to the form the user uses to update the message board
router.get("/new", (req, res) => {
  res.render("index", { title: "The Message Board", arr: messages, createNewMessageForm: true, plus: false })
})

router.post("/new", (req, res) => {
  const message = req.body.message
  const user = req.body.user
  messages.push({
    text: message,
    user: user,
    added: new Date().toLocaleDateString()
  })
  return res.redirect('/')
})

module.exports = router
