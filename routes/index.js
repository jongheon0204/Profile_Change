var express = require('express');
const DB = require('../public/javascripts/database');
DB.connect();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	DB.getProfile('jongheon').then(function(data){
		console.log('getProfile : ',data);
		res.render('index',{c_name : data[0].name,c_email : data[0].email,c_phone : data[0].telephone});
	});
});

module.exports = router;
