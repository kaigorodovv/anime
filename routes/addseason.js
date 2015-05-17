exports.get = function(req,res){

  res.render('addseason', { title: 'Добавление сезона', user: req.user, animeID: req.params.id})

};


exports.post = function(req,res){

  var animeID = req.body.animeID;
  var number = req.body.number;

  var Anime = require('.././models/anime').Anime;

  console.log(number);
  console.log(animeID);


  Anime.findByIdAndUpdate(
    animeID,
    {$push: {"seasons": {number: number}}},
    {safe: true, upsert: true},
    function(err, model) {
        if(err) {
          console.log(err);
        } else {
          res.send("<p>Сезон добавлен</p>");
        }
  });

}