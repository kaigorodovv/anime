exports.get = function(req, res, next){
	var Anime = require('.././models/anime').Anime;


	Anime.find({type: 'serials'}, function(err, animes) {
    	if (err) return next(err);

	    animes.sort(function(x, y) {
	    	return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1));
	    });

		res.render('serials', { title: 'Аниме сериалы', user: req.user, animes: animes})
	})

};

