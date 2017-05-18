var express = require('express');

var homeRouter = express.Router();
	
homeRouter.get('/', (req, res, next) => { res.end('homepage') } );

module.exports = homeRouter;
