exports.get = function(req, res){
  res.render('myanimelist', { title: 'Мой аниме лист', user: req.user})
};
