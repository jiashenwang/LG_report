'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Invitation = mongoose.model('Invitation'),
	_ = require('lodash');

/**
 * Create a Invitation
 */
exports.create = function(req, res) {
	var invitation = new Invitation(req.body);
	invitation.user = req.user;

	invitation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invitation);
		}
	});
};

/**
 * Show the current Invitation
 */
exports.read = function(req, res) {
	res.jsonp(req.invitation);
};

/**
 * Update a Invitation
 */
exports.update = function(req, res) {
	var invitation = req.invitation ;

	invitation = _.extend(invitation , req.body);

	invitation.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invitation);
		}
	});
};

/**
 * Delete an Invitation
 */
exports.delete = function(req, res) {
	var invitation = req.invitation ;

	invitation.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invitation);
		}
	});
};

/**
 * List of Invitations
 */
exports.list = function(req, res) { Invitation.find().sort('-created').populate('user', 'displayName').exec(function(err, invitations) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invitations);
		}
	});
};

/**
 * Invitation middleware
 */
exports.invitationByID = function(req, res, next, id) { Invitation.findById(id).populate('user', 'displayName').exec(function(err, invitation) {
		if (err) return next(err);
		if (! invitation) return next(new Error('Failed to load Invitation ' + id));
		req.invitation = invitation ;
		next();
	});
};

/**
 * Invitation authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.invitation.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};