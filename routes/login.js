var User = require('.././models/users').User;
var HttpError = require('.././error').HttpError;
var AuthError = require('.././models/users').AuthError;


exports.get = function(req, res){
  res.render('login', { title: 'Вход', user: req.user })
};


exports.post = function(req, res, next){
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