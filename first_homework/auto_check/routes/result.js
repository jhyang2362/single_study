var express = require('express');
var router = express.Router();
var variables = require('../variable.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('result', { number1: variables.num1, number2: variables.num2 ,ans: variables.result} );
  console.log(variables.num1, variables.num2, variables.result);
});

module.exports = router;
