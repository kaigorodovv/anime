var express = require('express')
  , routes = require('./routes')
  , cookieParser = require('cookie-parser')
  , MongoStore = require('connect-mongo')(express)
  , mongoose = require('./libs/mongoose');

var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ 
    secret: "your secret here",
    key: "sid",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: null
    },
    store: new MongoStore({mongoose_connection: mongoose.connection})
}));

  app.use(require('./middleware/loadUser'));

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/myanimelist', routes.myanimelist);
app.get('/animeserials', routes.animeserials);
app.get('/animeova', routes.animeova);
app.get('/animemovie', routes.animemovie);
app.get('/allanime', routes.allanime);
app.get('/addanime', routes.addanime);
app.get('/addseries', routes.addseries);
app.get('/admin', routes.admin);
app.get('/login', routes.login);
app.post('/login', routes.loginpost);
app.post('/logout', routes.logoutpost);

app.post('/dropanime', routes.dropanime);
app.post('/addanime',routes.addanimepost);
app.post('/addseries',routes.addseriespost);

app.get('/myanimelist/:id', routes.myanimelist);
app.get('/animeserials/:id', routes.animeserials);
app.get('/animeova/:id', routes.animeova);
app.get('/animemovie/:id', routes.animemovie);

var User = require('./models/users').User;

app.get('/user', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) return next(err);
    res.json(users);
  })
});



app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});