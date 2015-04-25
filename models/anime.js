var mongoose = require('.././libs/mongoose'),
Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

var Animeseries = new Schema({
	numberSeries: {
		type: Number
	},
	path: {
		type: String
	}
});

var Season = new Schema({
	numberSeason: {
		type: Number,
		required: true
	},
	seriesSeason : [{ type: Schema.Types.ObjectId, ref: 'Animeseries' }]
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
	animeseries: [Animeseries],
	animeseasons: [Season]
});

exports.Anime = mongoose.model('Anime', Anime); 

Anime.plugin(uniqueValidator);	
Animeseries.plugin(uniqueValidator);
