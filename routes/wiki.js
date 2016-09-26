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

})

router.post('/', bodyParser(), function(req, res, next){
  // submit new page to db
  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  page.save();
  res.redirect('/');
})

router.get('/add', function(req, res, next){
  // retrieve the 'add a page' form
  res.render('addpage');
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
