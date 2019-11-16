var express = require('express');
const DB = require('../public/javascripts/database');
DB.connect();
var router = express.Router();
var result;
DB.getProfile('jongheon').then(function(data){
	console.log('index.js : ',data);
	result = data;
});


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('val = ',result[0].name);
	res.render('index',{title : result[0].name });
});

module.exports = router;
