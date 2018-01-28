var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'By The Book | Home of the Book Readers' });
});

module.exports = router;
