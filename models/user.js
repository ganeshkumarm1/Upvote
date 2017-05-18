var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
	id: String,
	email: String,
	name: String,
	token: String,
});

module.exports = mongoose.model('User', User);