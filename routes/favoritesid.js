exports.get = function(req, res, next) {
	var Anime = require('.././models/anime').Anime;
	var user = req.user;
	var f = require('array.prototype.find');


	Anime.find({type: 'serials'}, function(err, animes) {
    	if (err) return next(err);

    	animes = animes.filter(function(item) {
    		var a = user.favorites.find(function(favitem, index, arr) {
    			return favitem.animeID ==  item._id;
    		})
    		if(a == undefined) {
    			return false;
    		} else {
    			return true;
    		}
		})

    	animes.forEach(function(item, i, arr) {
    		item.series = item.series.filter(function(sitem) {
    			var a = user.favorites.find(function(favitem, favindex, favarr){
    				return favitem.seriesID == sitem._id
    			})
    			if(a == undefined) {
    				return false;
    			} else {
    				return true;
    			}
    		})
    	})

        for(var i = 0; i < animes.length; i++) {
            if(animes[i]._id == req.params.id) {
                anime = animes[i];
                break;
            }
        }

    	console.log(user.favorites)
		console.log(animes)
	    
		res.render('favoritesid', { title: 'Мой аниме лист', user: req.user, anime: anime, animeID: req.params.id})
	})

};


