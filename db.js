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
});