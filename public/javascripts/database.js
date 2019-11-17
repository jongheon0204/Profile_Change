const DB = require('mysql');
var connection;
var database = {};

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

database.connect = function(){

	connection = DB.createConnection({
		host : 'localhost',
		user : 'root',
		password : '***',
		database : 'eszett'
	});

	connection.connect;
}

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
