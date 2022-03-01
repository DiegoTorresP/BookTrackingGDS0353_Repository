var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/administrar');
});

router.get('/a', function(req, res, next) {
  res.redirect('/alumnos');
});
module.exports = router;
