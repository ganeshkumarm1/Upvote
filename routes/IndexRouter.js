var express = require('express');
var path = require('path');

var indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', (req, res, next) => { res.sendFile(path.join(__dirname, '../public/views/index.html')) });

module.exports = indexRouter;
