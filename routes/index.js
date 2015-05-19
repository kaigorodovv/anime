module.exports = function (app) {
    app.get('/', require('./main').get);
    app.get('/myanimelist', require('./myanimelist').get);
    app.get('/favorites', require('./favorites').get);
    app.get('/favorites/:id', require('./favoritesid').get);

    app.get('/seen', require('./seen').get);
    app.get('/seen/:id', require('./seenid').get);

    app.get('/watchlater', require('./watchlater').get);
    app.get('/watchlater/:id', require('./watchlaterid').get);
    
    app.get('/serials', require('./serials').get);
    app.get('/serials/:id', require('./serialsid').get);
    app.get('/series/:?', require('./series').get);

    app.post('/addFavoritesSerials', require('./addFavoritesSerials').post);
    app.post('/dropFavoritesSerials', require('./dropFavoritesSerials').post);

    app.post('/addSeen', require('./addSeen').post);
    app.post('/dropSeen', require('./dropSeen').post);

    app.post('/addWatchLater', require('./addWatchLater').post);
    app.post('/dropWatchLater', require('./dropWatchLater').post);

    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);
    app.post('/logout', require('./logout').post);

    app.get('/admin', require('./admin').get);
    app.get('/admin/:id', require('./editanime').get);

    app.get('/addanime', require('./addanime').get);
    app.post('/addanime', require('./addanime').post);

    app.post('/dropanime', require('./dropanime').post);

    app.get('/addseason/:id', require('./addseason').get);
    app.post('/addseason', require('./addseason').post);

    app.get('/addseries/:id', require('./addseries').get);
    app.post('/addseries', require('./addseries').post);


};