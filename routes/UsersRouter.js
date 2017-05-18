var express = require('express');
var passport = require('passport');
var usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', (req, res, next) => { res.end('users') } );

usersRouter.get('/google/oauth2', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
usersRouter.get('/google/oauth2/callback',
    passport.authenticate('google', {
        successRedirect : '/home',
        failureRedirect : '/'
}));

module.exports = usersRouter;
