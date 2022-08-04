var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// every route in this file will start with /users
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res) {
  res.send('you\'re so cool')
})

module.exports = router;
