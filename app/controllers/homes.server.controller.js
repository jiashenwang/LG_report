'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Home = mongoose.model('Home'),
	_ = require('lodash');

/**
 * Create a Home
 */
exports.create = function(req, res) {
	var home = new Home(req.body);
	home.user = req.user;

	home.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(home);
		}
	});
};

/**
 * Show the current Home
 */
exports.read = function(req, res) {
	res.jsonp(req.home);
};

/**
 * Update a Home
 */
exports.update = function(req, res) {
	var home = req.home ;

	home = _.extend(home , req.body);

	home.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(home);
		}
	});
};

/**
 * Delete an Home
 */
exports.delete = function(req, res) {
	var home = req.home ;

	home.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(home);
		}
	});
};

/**
 * List of Homes
 */
exports.list = function(req, res) { Home.find().sort('-created').populate('user', 'displayName').exec(function(err, homes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(homes);
		}
	});
};

/**
 * Home middleware
 */
exports.homeByID = function(req, res, next, id) { Home.findById(id).populate('user', 'displayName').exec(function(err, home) {
		if (err) return next(err);
		if (! home) return next(new Error('Failed to load Home ' + id));
		req.home = home ;
		next();
	});
};

/**
 * Home authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.home.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};