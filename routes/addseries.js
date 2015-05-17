exports.get = function(req,res){

  var Anime = require('.././models/anime').Anime;
  Anime.find({_id:req.params.id}, function(err, anime) {
    if (err) return next(err);

  res.render('addseries', { title: 'Добавление серии', user: req.user, animeID: req.params.id, anime: anime})
  })
};

exports.post = function(req,res){

  var season = req.body.season;
  var animeID = req.body.animeID;
  var number = req.body.number;
  var name = req.body.name;
  var path = req.body.path;

  var Anime = require('.././models/anime').Anime;

  Anime.findByIdAndUpdate(
    animeID,
    {$push: {"series": {season : season, number: number, name: name, path: path}}},
    {safe: true, upsert: true},
    function(err, model) {
        if(err) {
          console.log(err);
        } else {
          res.send("<p>Серия добавлена</p>");
        }
  });

}