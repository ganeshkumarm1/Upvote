var express = require('express');
var crypto = require('crypto');
var mongoose = require('mongoose');

var pollsRouter = express.Router();
var verify = require('../common/verify');

var Poll = require('../models/Poll');

pollsRouter.route("/")
	.all(verify.verifyUser, (req, res, next) => next())
	.get((req, res, next) => {
		Poll.find({createdBy: req._id}, (err, polls) => {
			if(err) throw err;
			res.json(polls);
		})
	})
	.post((req, res, next) => {
		const pollID = crypto.randomBytes(16).toString("hex");
		req.body.pollID = pollID;

		Poll.create(req.body, (err, poll) => {
			if(err) throw err;
			console.log(poll);
			res.end('successfully added polls');
		});
	})

pollsRouter.route("/mypolls")
	.all(verify.verifyUser, (req, res, next) => next())
	.get((req, res, next) => {
		Poll.find({createdBy: mongoose.mongo.ObjectId(req.decoded._doc._id) }, (err, polls) => {
			if(err) throw err;
			res.json(polls);
		});
	});

pollsRouter.route("/:pollID")
	.all(verify.verifyUser, (req, res, next) => next())
	.get((req, res, next) => {
		Poll.findOne({pollID: req.params.pollID}, (err, poll) => {
			if(err) throw err;
			res.json(poll);
		});
	})
	.delete((req, res, next) => {
		Poll.remove({pollID: req.params.pollID}, (err, poll) => {
			res.end('Removed your poll successfully');
		});
	});

module.exports = pollsRouter;