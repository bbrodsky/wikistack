'use strict'

var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var models = require('../models');
var Page = models.Page;
var User = models.User;

var router = express.Router();


router.get('/', function(req, res, next){
  // get all wiki pages
  Page.findAll({
    attributes: ['title','urlTitle']
  })
  .then(function(arr) {
    res.render('index', {pages: arr});
  })
});

router.post('/', bodyParser(), function(req, res, next){
  // submit new page to db
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  page.save()
  .then(function(e){
    // res.json(e);
    res.redirect(e.urlTitle);
  });
})


router.get('/add', function(req, res, next){
  // retrieve the 'add a page' form
  res.render('addpage');
})

// line 40 fires from  line 29's redirect ( post route )
router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.render('wikipage', {title: foundPage.title, content: foundPage.content});
  })
  .catch(next);

})

router.get('/users', function(req, res, next) {
  // get all users

})

router.get('/users/:id', function(req, res, next) {
  // get specific user
})

router.post('/users', function(req, res, next) {
  // create user in db
  res.redirect('/');
})

router.put('/users/:id', function(req, res, next) {
  // update user in db
  res.redirect('/users/' + req.params.id);
})

router.delete('/users/:id', function(req, res, next) {
  // remove user from db
  res.redirect('/');
})

module.exports = router;
