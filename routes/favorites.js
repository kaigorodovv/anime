exports.get = function(req, res, next) {
	var Anime = require('.././models/anime').Anime;
	var user = req.user;


	Anime.find({type: 'serials'}, function(err, animes) {
    	if (err) return next(err);

	    console.log(user.favorites);


		res.render('favorites', { title: 'Мой аниме лист', user: req.user, animes: animes})
	})

};