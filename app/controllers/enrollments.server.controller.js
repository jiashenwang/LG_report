'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Enrollment = mongoose.model('Enrollment'),
	_ = require('lodash');

/**
 * Create a Enrollment
 */
exports.create = function(req, res) {
	var enrollment = new Enrollment(req.body);
	enrollment.user = req.user;

	enrollment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enrollment);
		}
	});
};

/**
 * Show the current Enrollment
 */
exports.read = function(req, res) {
	res.jsonp(req.enrollment);
};

/**
 * Update a Enrollment
 */
exports.update = function(req, res) {
	var enrollment = req.enrollment ;

	enrollment = _.extend(enrollment , req.body);

	enrollment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enrollment);
		}
	});
};

/**
 * Delete an Enrollment
 */
exports.delete = function(req, res) {
	var enrollment = req.enrollment ;

	enrollment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enrollment);
		}
	});
};

/**
 * List of Enrollments
 */
exports.list = function(req, res) { Enrollment.find().sort('-created').populate('user', 'displayName').exec(function(err, enrollments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(enrollments);
		}
	});
};

/**
 * Enrollment middleware
 */
exports.enrollmentByID = function(req, res, next, id) { Enrollment.findById(id).populate('user', 'displayName').exec(function(err, enrollment) {
		if (err) return next(err);
		if (! enrollment) return next(new Error('Failed to load Enrollment ' + id));
		req.enrollment = enrollment ;
		next();
	});
};

/**
 * Enrollment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.enrollment.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};