var mongoose = require('.././libs/mongoose'),
Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

var Animeseries = new Schema({
	numberSeason: {
		type: Number,
		required: true
	},
	numberSeries: {
		type: Number
	},
	nameSeries: {
		type: String
	},
	path: {
		type: String
	}
});

var Season = new Schema({
	numberSeason: {
		type: Number,
		required: true
	}
});

var Anime = new Schema({
	animetype: {
		type: String,
		required: true
	},

	animename: {
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
	animeseries: [Animeseries],
	animeseasons: [Season]
});

exports.Anime = mongoose.model('Anime', Anime); 

Anime.plugin(uniqueValidator);	
Animeseries.plugin(uniqueValidator);
