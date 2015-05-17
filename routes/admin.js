exports.get = function(req, res){
  
  var Anime = require('.././models/anime').Anime;

  Anime.find({}, function(err, animes) {
    if (err) return next(err);
    animes.sort(function(x, y) {
      return ((x.animename == y.animename) ? 0 : ((x.animename > y.animename) ? 1 : -1));
    });

  res.render('admin', { title: 'Админ', user: req.user, animes: animes})
  })
};