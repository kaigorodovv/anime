exports.get = function(req,res){
  res.render('addanime', { title: 'Добавление аниме', user: req.user})
}

exports.post = function(req, res) {

  var name = req.body.name;
  var genre = req.body.genre;
  var type = req.body.type;
  var image = req.body.image;
  var info = req.body.info;

  console.log(name);

  var Anime = require('.././models/anime').Anime;

  var anime = new Anime({
    type: type,
    name: name,
    genre: [genre],
    image: image,
    info: info
  });

  anime.save( function(err) {
      if(err) {
        console.log('err' + err);
        res.send("<p>Ошибка при добавлении</p>");
      }
      else
      res.send("<p>Аниме добавлено</p>");
  });
}