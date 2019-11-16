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
				console.log('update : ',results);
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
				console.log('select : ',results);
				resolve(results);
			}
		});
	});
}

database.connect = function(){

	connection = DB.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'nsrklisr2@',
		database : 'eszett'
	});

	connection.connect;
	console.log("Connection\n");
}

database.getProfile = async function(customer_id){
	return new Promise(function(resolve,reject){
		var condition = 'where name = \''+customer_id+'\'';
		select('customer','*',condition).then(function(data){
			console.log('getProfile : ',data);
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
		var set = 'set '+field+' = \''+val+'\'';
		var condition = 'where name = \''+customer_id+'\'';
		update('customer',set,condition).then(function(data){
			console.log('setProfile : ',data);
			if(data == 'error'){
				reject('error');
			}else{
				resolve(data);
			}
		});
	});
}

module.exports = database;
