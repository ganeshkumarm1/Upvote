var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserPoll = new Schema({
	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	votedFor: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Poll'
	}]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('UserPoll', UserPoll);