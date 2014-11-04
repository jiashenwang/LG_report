'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Portfolio = mongoose.model('Portfolio'),
	_ = require('lodash');

/**
 * Create a Portfolio
 */
exports.create = function(req, res) {
	var portfolio = new Portfolio(req.body);
	portfolio.user = req.user;

	portfolio.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(portfolio);
		}
	});
};

/**
 * Show the current Portfolio
 */
exports.read = function(req, res) {
	res.jsonp(req.portfolio);
};

/**
 * Update a Portfolio
 */
exports.update = function(req, res) {
	var portfolio = req.portfolio ;

	portfolio = _.extend(portfolio , req.body);

	portfolio.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(portfolio);
		}
	});
};

/**
 * Delete an Portfolio
 */
exports.delete = function(req, res) {
	var portfolio = req.portfolio ;

	portfolio.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(portfolio);
		}
	});
};

/**
 * List of Portfolios
 */
exports.list = function(req, res) { Portfolio.find().sort('-created').populate('user', 'displayName').exec(function(err, portfolios) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(portfolios);
		}
	});
};

/**
 * Portfolio middleware
 */
exports.portfolioByID = function(req, res, next, id) { Portfolio.findById(id).populate('user', 'displayName').exec(function(err, portfolio) {
		if (err) return next(err);
		if (! portfolio) return next(new Error('Failed to load Portfolio ' + id));
		req.portfolio = portfolio ;
		next();
	});
};

/**
 * Portfolio authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.portfolio.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};