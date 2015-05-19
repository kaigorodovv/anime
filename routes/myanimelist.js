exports.get = function(req, res){

	var Anime = require('.././models/anime').Anime;
	var User = require('.././models/users').User;


	var animeID = req.user.lastViewed[0].animeID;
	var seriesID = req.user.lastViewed[0].seriesID;
	var user = req.user;
	var favorites = 0;
	var seen = 0;
	var watchLater = 0;

	console.log(animeID)
	console.log(seriesID)

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


	}


	

	    Anime.find({_id: animeID}, function(err, anime) {
    	if (err) return next(err);

    	for( var i = 0; i < anime[0].series.length; i++) {
    		if(anime[0].series[i]._id == seriesID) {
    			var series = anime[0].series[i];
    			break;
    		}
    	}

			res.render('myanimelist', { title: "Мой аниме лист", 
									user: req.user,  
									anime : anime, 
									series: series, 
									animeID: animeID, 
									seriesID: seriesID,
									favorites: favorites,
									seen: seen,
									watchLater: watchLater
								})
		})
};
