var express = require('express');
var morgan = require('morgan');
var nunjucks = require('nunjucks');

var app = express();
// var router = express.Router();
var models = require('./models');
var wikiRouter = require('./routes/wiki');


app.use(express.static('./public'));
app.use('/wiki', wikiRouter);

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

// app.listen(3000);

models.User.sync({}) // alternet see Ben Cohen's solution for Promise.all
// {force:true} if updated schema
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
