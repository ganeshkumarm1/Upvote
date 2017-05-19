var express = require('express');

var verify = require('../common/verify');

var voteRouter = express.Router();
var UserPoll = require('../models/UserPoll');
var Poll = require('../models/Poll');

voteRouter.route("/")
	.all(verify.verifyUser, (req, res, next) => {
		next()
	})
	.post((req, res, next) => {
		Poll.findOne({pollID: req.body.pollID}, (err, poll) => {
			UserPoll.findOne({userID: req.decoded._doc._id}, (err, userpoll) => {
				var votedFor = userpoll.votedFor;
				console.log(votedFor.indexOf(poll._id));
				if(votedFor.indexOf(poll._id) < 0)
				{
					var l = poll["pollOptions"].length;
					for(var i in poll["pollOptions"])
					{
						if(i < l)
						{
							if(poll["pollOptions"][i].option == req.body.option)
							{
								poll.pollOptions[i].votes += 1;
								break;
							}
						}
					}
					poll.save();
					UserPoll.update({userID: req.decoded._doc._id}, {$push: {votedFor: poll._id}}, (err, voted) => {
						if(err) throw err;
						res.end('You have voted successfully');
					});
				}
				else
				{
					res.end('You have aleady voted');
				}
			});
		});		
	});

module.exports = voteRouter;