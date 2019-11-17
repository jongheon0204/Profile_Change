const DB = require('mysql');
var connection;
var database = {};

//update query를 만들어 실행
function update(table,set,condition){
	return new Promise(function(resolve,reject){
		var query = 'update '+table+' set '+set+' where '+condition+';';
		connection.query(query,function(err,results,fields){
			if(err){
				console.log('update : ',err);
				reject('error');
			}else{
				resolve(results);
			}
		});
	});
};

//select query를 만들어 실행
function select(tables,attributes,condition){
	return new Promise(function(resolve,reject){
		var query = 'select '+attributes+' from '+tables+' '+condition+';';
		connection.query(query,function(err,results,fields){
			if(err){
				console.log('select : ',err);
				reject('error');
			}else{
				resolve(results);
			}
		});
	});
}

//export함수 database객체에 DB 서버와 연결할 함수 설정
database.connect = function(){

	connection = DB.createConnection({
		host : 'localhost',
		user : 'root',
		password : '**',
		database : 'eszett'
	});

	connection.connect;
}

//export함수 customer_id를 이용하여 프로필 정보 얻어오기
database.getProfile = async function(customer_id){
	return new Promise(function(resolve,reject){
		var condition = 'where customer_id = \''+customer_id+'\'';
		select('customer','*',condition).then(function(data){
			if(data == 'error'){
				reject('error');
			}else{
				resolve(data);
			}
		});
	});
}

//export함수 customer_id,field,val을 이용하여 프로필 정보 변경
database.setProfile = async function(customer_id,field,val){
	return new Promise(function(resolve,reject){
		var set = field+' = \''+val+'\'';
		var condition = 'customer_id = \''+customer_id+'\'';
		update('customer',set,condition).then(function(data){
			if(data == 'error'){
				reject('error');
			}else{
				resolve(data);
			}
		});
	});
}

module.exports = database;
