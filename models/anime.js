var mongoose = require('.././libs/mongoose'),
Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

var Series = new Schema({
	season: {
		type: Number,
		required: true
	},
	number: {
		type: Number
	},
	name: {
		type: String
	},
	path: {
		type: String
	}
});

var Season = new Schema({
	number: {
		type: Number,
		required: true
	}
});

var Anime = new Schema({
	type: {
		type: String,
		required: true
	},

	name: {
		type: String,
		unique: true,
		required: true
	},
	genre: {
		type: Array,
		required: true
	},
	image: {
		type: String
	},
	info: {
		type: String
	},
	series: [Series],
	seasons: [Season]
});

exports.Anime = mongoose.model('Anime', Anime); 

Anime.plugin(uniqueValidator);	
Series.plugin(uniqueValidator);
