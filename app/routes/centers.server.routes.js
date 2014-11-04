'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var centers = require('../../app/controllers/centers');

	// Centers Routes
	app.route('/centers')
		.get(centers.list)

		app.route('/centers')
			.get(centers.create)
	app.route('/centers/:centerId')
		.get(centers.read)
		.put(users.requiresLogin, centers.hasAuthorization, centers.update)
		.delete(users.requiresLogin, centers.hasAuthorization, centers.delete);

	// Finish by binding the Center middleware
	app.param('centerId', centers.centerByID);
};
