/*module.exports = {
	isAuthenticated: (req, res, next) => {
	    if (req.isAuthenticated())
	        return next();
	    console.log('Not authenticated');
	    res.redirect('/');
	}
}
*/
var jwt = require('jsonwebtoken');

var User = require('../models/User');

var auth = require('../config/auth');

exports.getToken = function (user) {
    return jwt.sign(user, auth.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyUser = (req, res, next) => {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token)
	{
		jwt.verify(token, auth.secretKey, (err, decoded) => {
			if(err)
			{
				var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
			}
			else
			{
				req.decoded = decoded;
				next();
			}
		});
	}
	else
	{
		var err = new Error('No token provided!');
		err.status = 403;
		return next(err);
	}
}