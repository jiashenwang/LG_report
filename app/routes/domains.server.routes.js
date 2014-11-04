'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var domains = require('../../app/controllers/domains');

	// Domains Routes
	app.route('/domains')
		.get(domains.list)
		.post(users.requiresLogin, domains.create);

	app.route('/domains/:domainId')
		.get(domains.read)
		.put(users.requiresLogin, domains.hasAuthorization, domains.update)
		.delete(users.requiresLogin, domains.hasAuthorization, domains.delete);

	// Finish by binding the Domain middleware
	app.param('domainId', domains.domainByID);
};