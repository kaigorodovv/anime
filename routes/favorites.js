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

    	console.log(user.favorites)
		console.log(animes)
	    
		res.render('favorites', { title: 'Мой аниме лист', user: req.user, animes: animes})
	})

};