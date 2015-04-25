var mongoose = require('./libs/mongoose');
var async = require('async');

async.series([
open,
dropDatabase,
requireModels,
createUser
], function(err) {
	console.log(arguments);
	mongoose.disconnect();
	console.log('disconnectDatabase');
	process.exit(err ? 255 : 0);
});

function open(callback) {
	mongoose.connection.on('open', callback);
	console.log('openDatabase');
}

function dropDatabase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
	console.log('dropDatabase');
}

function requireModels(callback) {
	require('./models/users');
	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
	console.log('requireModels');
}

function createUser(callback) {
	var users = [
		{
			_id:'1',
			animeid: ['1','4']
		},

		{
			_id:'2',
			animeid: ['1','3']
		}

		

	];

	async.each(users, function(userData, callback) {
		var user = new mongoose.models.User(userData);
		user.save(callback);
	}, callback);
	console.log('createUser');
}