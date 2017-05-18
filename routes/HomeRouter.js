var express = require('express');

var verify = require('../common/verify');

var homeRouter = express.Router();
	
homeRouter.get('/', verify.verifyUser, (req, res, next) => { 
	console.log(req);
	res.end(req.user.token) ;
} );

homeRouter.get('/all', verify.verifyUser, (req, res, next) => {
	console.log(req);
	res.end("all is well");
});

module.exports = homeRouter;
