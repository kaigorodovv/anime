var User = require('.././models/users').User;
var HttpError = require('.././error').HttpError;
var AuthError = require('.././models/users').AuthError;
var async = require('async');

exports.index = function(req, res){
  res.render('index', { title: 'Главная', user: req.user})
};

exports.myanimelist = function(req, res){

  res.render('myanimelist', { title: 'Мой аниме лист', user: req.user})
};

exports.animeserials = function(req, res){

  var Anime = require('.././models/anime').Anime;

  Anime.find({animetype: 'animeserials'}, function(err, animes) {
    if (err) return next(err);
    animes.sort(function(x, y) {
      return ((x.animename == y.animename) ? 0 : ((x.animename > y.animename) ? 1 : -1));
    });

  res.render('animeserials', { title: 'Аниме Сериалы',animes: animes, id: req.params.id, user: req.user})
  })

};


exports.animeova = function(req, res){


	var Anime = require('.././models/anime').Anime;

  Anime.find({animetype: 'animemova'}, function(err, animes) {
    if (err) return next(err);
    animes.sort(function(x, y) {
      return ((x.animename == y.animename) ? 0 : ((x.animename > y.animename) ? 1 : -1));
    });

  res.render('animeova', { title: 'Аниме OVA',animes: animes, id: req.params.id, user: req.user})
  })

};

exports.animemovie = function(req, res){

req.session.numberOfVisits = 1 +1 || 1;

  var Anime = require('.././models/anime').Anime;

  Anime.find({animetype: 'animemovie'}, function(err, animes) {
    if (err) return next(err);
    animes.sort(function(x, y) {
      return ((x.animename == y.animename) ? 0 : ((x.animename > y.animename) ? 1 : -1));
    });

  res.render('animemovie', { title: 'Аниме Фильмы',animes: animes, id: req.params.id, user: req.user})
  })
};


exports.login = function(req, res){
  res.render('login', { title: 'Вход', user: req.user })
};

exports.loginpost = function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  User.authorize(username, password, function(err, user) {
    if (err) {
      if (err instanceof AuthError) {
        return next(new HttpError(403, err.message));
      } else {
        return next(err);
      }
    }

    req.session.user = user._id;
    res.send({});

  });
};

exports.logoutpost = function(req, res){
  req.session.destroy();
  res.redirect('/');
};

exports.allanime = function(req, res){


  var Anime = require('.././models/anime').Anime;

  Anime.find({}, function(err, animes) {
    if (err) return next(err);
    animes.sort(function(x, y) {
      return ((x.animename == y.animename) ? 0 : ((x.animename > y.animename) ? 1 : -1));
    });

  res.render('allanime', { title: 'Все аниме', user: req.user, animes: animes})
  })
}


exports.admin = function(req, res){
  res.render('admin', { title: 'Админ', user: req.user})
};

exports.addanime = function(req,res){
  res.render('addanime', { title: 'Добавление аниме', user: req.user})
}

exports.addseries = function(req,res){

    var Anime = require('.././models/anime').Anime;

  Anime.find({}, function(err, animes) {
    if (err) return next(err);
    animes.sort(function(x, y) {
      return ((x.animename == y.animename) ? 0 : ((x.animename > y.animename) ? 1 : -1));
    });

  res.render('addseries', { title: 'Добавление серии', user: req.user, animes: animes})
  })
}

exports.addanimepost = function(req, res) {

  var animename = req.body.animename;
  var genre = req.body.genre;
  var animetype = req.body.animetype;

  var Anime = require('.././models/anime').Anime;

  var anime = new Anime({
    animetype: animetype,
    animename: animename,
    genre: [genre]
  });
  anime.save( function(err) {
      if(err) 
        console.log('err' + err); 
      res.send("<p>Аниме добавлено</p>");
  });
}

exports.addseriespost = function(req,res){

  var animeid = req.body._id;
  var numberSeries = req.body.numberSeries;
  var path = req.body.path;
  var f = false;

  var Anime = require('.././models/anime').Anime;

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

  });

 /* Anime.findByIdAndUpdate(
    animeid,
    {$push: {"animeseries": {numberSeries: numberSeries, path: path}}},
    {safe: true, upsert: true},
    function(err, model) {
        console.log(err);
  });*/

}

exports.dropanime = function(req,res) {
  var animeid = req.body.animeid;
  
  var Anime = require('.././models/anime').Anime;
  
  Anime.findOneAndRemove({_id:animeid}, function(err){
    if(err)
        console.log('err'+ err);
  })

}