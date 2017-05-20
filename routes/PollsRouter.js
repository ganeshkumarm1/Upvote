var express = require('express');
var crypto = require('crypto');
var mongoose = require('mongoose');

var pollsRouter = express.Router();
var verify = require('../common/verify');

var Poll = require('../models/Poll');
var UserPoll = require('../models/UserPoll');

pollsRouter.route("/")
	.all(verify.verifyUser, (req, res, next) => next())
	.get((req, res, next) => {
		Poll.find({}, (err, polls) => {
			if(err) throw err;
			res.status(200).json(polls);
			res.end();
		})
	})
	.post((req, res, next) => {
		const pollID = crypto.randomBytes(16).toString("hex");
		req.body.pollID = pollID;
		req.body.pollOptions = JSON.parse(req.body.pollOptions);
		req.body.createdBy = req.decoded._doc._id;
		Poll.create(req.body, (err, poll) => {
			if(err) throw err;
			res.end('successfully added polls');
		});
	})
	.delete((req, res, next) => {
		Poll.remove({pollID: req.body.pollID}, (err, poll) => {
			res.end('Removed your poll successfully');
		});
	});

pollsRouter.route("/mypolls")
	.all(verify.verifyUser, (req, res, next) => next())
	.get((req, res, next) => {
		Poll.find({createdBy: mongoose.mongo.ObjectId(req.decoded._doc._id) }, (err, polls) => {
			if(err) throw err;
			res.json(polls);
		});
	});

pollsRouter.route("/:pollID")
	/*.all(verify.verifyUser, (req, res, next) => next())*/
	.get((req, res, next) => {
		Poll.findOne({pollID: req.params.pollID}, (err, poll) => {
			if(err) throw err;
			res.json(poll);
		});
	});

module.exports = pollsRouter;