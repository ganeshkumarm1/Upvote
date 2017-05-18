var express = require('express');
var passport = require('passport');
var usersRouter = express.Router();

var verify = require('../common/verify');

usersRouter.get('/google/oauth2', passport.authenticate('google', { scope : ['profile', 'email'] }));

usersRouter.get('/google/oauth2/callback',
    passport.authenticate('google', {
        successRedirect : '/users/returnToken',
        failureRedirect : '/'
}));

usersRouter.get('/returnToken', (req, res) => {
	var token = verify.getToken(req.user);
	res.status(200).json({token: token});
});

usersRouter.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = usersRouter;
