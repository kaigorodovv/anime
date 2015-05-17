exports.post = function(req,res) {
  var animeID = req.body.animeID;
  
  var Anime = require('.././models/anime').Anime;
  
  Anime.findOneAndRemove({_id:animeID}, function(err){
    if(err) {
        console.log(err);
        res.send("Ошибка при удалении");
      }
      else
      res.send("Аниме удалено");

  })

}