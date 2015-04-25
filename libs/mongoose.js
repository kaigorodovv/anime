var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/site');
module.exports = mongoose;
