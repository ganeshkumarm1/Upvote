var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Poll = new Schema({
	pollID: String,
	question: String,
	options: [String],
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}}
	,
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Poll', Poll);

/*
polls
	pollid
	question
	options=[]
	createdBy
	votedby
*/