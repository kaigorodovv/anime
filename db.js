var Anime = require('./models/anime').Anime;

//push, pop, pull, addToSet

var animename = "Название аниме";
var genre = "какая-то дичь";
var animetype = "1";

var anime = new Anime({
	animetype: animetype,
    animename: animename,
    genre: [genre]
});

anime.save( function(err) {
    if(err) 
        console.log('err' + err); 
    console.log('all right');
});

//---------------------

var animeid = req.body._id;
  var numberSeries = req.body.numberSeries;
  var path = req.body.path;
  var f = false;

  Anime.find({_id : animeid}, function(err,anime) {
    for(var i = 0; i < anime[0].animeseries.length; i++) {
      console.log(numberSeries);
      if(anime[0].animeseries[i].numberSeries === parseInt(numberSeries)) {
        f = true;
        break;
      }
    }
    if(f) {
      console.log('errorerror');
    } else {
      Anime.findByIdAndUpdate(
      animeid,
      {$push: {"animeseries": {numberSeries: numberSeries, path: path}}},
      {safe: true, upsert: true},
      function(err, model) {
          if(err) console.log('err');
      })
    }
