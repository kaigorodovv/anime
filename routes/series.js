exports.get = function(req, res, next) {
	var Anime = require('.././models/anime').Anime;
	var User = require('.././models/users').User;


	var animeID = req.query.animeid;
	var seriesID = req.query.seriesid;
	var user = req.user;
	var favorites = 0;
	var seen = 0;
	var watchLater = 0;

	if(user) {

		for(var i = 0; i < user.favorites.length; i++) {
			if(user.favorites[i].seriesID == seriesID) {
				favorites = 1;
				break;
			}
		}

		for(var i = 0; i < user.seen.length; i++) {
			if(user.seen[i].seriesID == seriesID) {
				seen = 1;
				break;
			}
		}

		for(var i = 0; i < user.watchLater.length; i++) {
			if(user.watchLater[i].seriesID == seriesID) {
				watchLater = 1;
				break;
			}
		}

		User.findByIdAndUpdate(
		    user._id,
		    {"lastViewed": {animeID: animeID,  seriesID: seriesID}},
		    {safe: true, upsert: true},
		    function(err, model) {
		        if(err)  console.log(err);
		  });

	}


	Anime.find({type: 'serials'}, function(err, animes) {
    	if (err) return next(err);

	    animes.sort(function(x, y) {
	    	return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1));
	    });

	    Anime.find({_id: animeID}, function(err, anime) {
    	if (err) return next(err);

    	for( var i = 0; i < anime[0].series.length; i++) {
    		if(anime[0].series[i]._id == seriesID) {
    			var series = anime[0].series[i];
    			break;
    		}
    	}

			res.render('series', { title: "Аниме сериалы", 
									user: req.user, 
									animes: animes, 
									anime : anime, 
									series: series, 
									animeID: animeID, 
									seriesID: seriesID,
									favorites: favorites,
									seen: seen,
									watchLater: watchLater
								})
		})
	})

};