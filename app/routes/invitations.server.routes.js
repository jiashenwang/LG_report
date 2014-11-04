'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var invitations = require('../../app/controllers/invitations');

	// Invitations Routes
	app.route('/invitations')
		.get(invitations.list)
		.post(users.requiresLogin, invitations.create);

	app.route('/invitations/:invitationId')
		.get(invitations.read)
		.put(users.requiresLogin, invitations.hasAuthorization, invitations.update)
		.delete(users.requiresLogin, invitations.hasAuthorization, invitations.delete);

	// Finish by binding the Invitation middleware
	app.param('invitationId', invitations.invitationByID);
};