var express = require('express');
var path = require('path');

var indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', (req, res, next) => { res.sendFile(path.join(__dirname, '../public/views/index.html')) });
indexRouter.get('/homepage', (req, res, next) => { res.sendFile(path.join(__dirname, '../public/views/home.html')) });
indexRouter.get('/newpoll', (req, res, next) => { res.sendFile(path.join(__dirname, '../public/views/newpoll.html')) });
indexRouter.get('/pollspage', (req, res, next) => { res.sendFile(path.join(__dirname, '../public/views/mypolls.html')) });
indexRouter.get('/pollpage', (req, res, next) => { res.sendFile(path.join(__dirname, '../public/views/poll.html')) })
module.exports = indexRouter;
