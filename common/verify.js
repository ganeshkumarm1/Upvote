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
var mongoose = require('mongoose');

var User = require('../models/User');
var UserPoll = require('../models/UserPoll');

var auth = require('../config/auth');

exports.getToken = function (user) {
    console.log(user);
    return jwt.sign(user, auth.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyUser = (req, res, next) => {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	console.log(req.headers['x-access-token']);
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
				UserPoll.findOne({userID: mongoose.mongo.ObjectId(req.decoded._doc._id)}, (err, userpoll) => {
					if(userpoll == null)	
					{
						UserPoll.create({userID: mongoose.mongo.ObjectId(req.decoded._doc._id), votedFor: []}, (err, userpoll) => {
							if(err) throw err;
						});		
					}
					next();
				});
				
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