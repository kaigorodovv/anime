var mongoose = require('./libs/mongoose');
var async = require('async');

async.series([
open,
requireModels,
createAnime
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
	require('./models/anime');
	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
	console.log('requireModels');
}

function createAnime(callback) {
	var animes = [
		

		{
			animename: 'Мастер крутящего момента', 
			genre: ['Приключения'],
			animepath: ['http://vk.com/video_ext.php?oid=-23431986&id=170857492&hash=60685283823ee149&hd=3',
			'http://vk.com/video_ext.php?oid=-23431986&id=170857488&hash=f568b8185d3d62b8&hd=3',
			'http://vk.com/video_ext.php?oid=-23431986&id=170857491&hash=5b479d2bdef73dc1&hd=3',
			'http://vk.com/video_ext.php?oid=-23431986&id=170857493&hash=d81ebab64590cc21&hd=3'
			]
		}
		

	];

	async.each(animes, function(animeData, callback) {
		var anime = new mongoose.models.Anime(animeData);
		anime.save(callback);
	}, callback);
	console.log('createAnime');
}