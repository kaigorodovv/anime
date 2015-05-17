exports.post = function(req, res, next){
	var Anime = require('.././models/anime').Anime;
	var User = require('.././models/users').User;

  var animeID = req.body.animeID;
	var seriesID = req.body.seriesID;
	var userID = req.user._id;

	User.findByIdAndUpdate(
    userID,
    {$pull: {"seen": {seriesID: seriesID}}},
    {safe: true, upsert: true},
    function(err, model) {
        if(err) {
          console.log(err);
        } else {

          res.send("<p class=\"button\" onclick=\"addSeen(\'" + animeID + "\', \'" + seriesID + "\')\">Добавить в просмотренное</p>");
        }
  });
};

