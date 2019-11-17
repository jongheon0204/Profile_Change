var express = require('express');
const DB = require('../public/javascripts/database');
DB.connect();
var router = express.Router();

/*
 * get방식으로 홈페이지에 접근 하였을 때는 고객의 id를 이용하여 정보들을 불러 온 후
 * html 파일에 정보를 전달해 준다
 */

router.get('/', function(req, res, next) {
	DB.getProfile('jongheon').then(function(data){
		res.render('index',{c_name : data[0].name,c_email : data[0].email,c_phone : data[0].telephone});
	});
});

/*
 * post로 고객의 수정 정보를 전달받은 후 update로 정보 변경해 주고 redirect를 이용해 
 * 페이지를 다시 다시 띄워준다
 */

router.post('/',function(req, res, next){
	var attribute = (req.body[0] == "이메일" ? "email" : "telephone");
	DB.setProfile('jongheon',attribute,req.body[1]).then(function(getResult){
		res.redirect('/');
	});
});

module.exports = router;
