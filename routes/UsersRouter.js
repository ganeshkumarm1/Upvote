var express = require('express');
var passport = require('passport');
var path = require('path');

var usersRouter = express.Router();

var verify = require('../common/verify');

usersRouter.get('/google/oauth2', passport.authenticate('google', { scope : ['profile', 'email'] }));

usersRouter.get('/google/oauth2/callback',
    passport.authenticate('google', {
        successRedirect : '/users/returnToken',
        failureRedirect : '/'
}));

usersRouter.route('/returnToken')
	.get((req, res, next) => {
		if(req.user)
		{
			var token = verify.getToken(req.user);
			res.render('token', {token: token});
		}
		else
		{
			res.redirect('/');
		}
	});

usersRouter.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = usersRouter;
