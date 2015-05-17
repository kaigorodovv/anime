exports.get = function(req, res) {
  var Anime = require('.././models/anime').Anime;
  Anime.find({_id:req.params.id}, function(err, anime) {
    if (err) return next(err);

  res.render('editanime', { title: 'Редактирование аниме', user: req.user, anime: anime, animeID: req.params.id})
  })
};
