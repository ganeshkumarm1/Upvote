var dotenv = require('dotenv');;
dotenv.load();

module.exports = {
	'google': {
		'clientID': process.env.GOOGLE_CLIENTID,
		'clientSecret': process.env.GOOGLE_CLIENTSECRET,
		'callbackURL': process.env.GOOGLE_CALLBACKURL
	},
	'secretKey': process.env.SECRET_KEY
}