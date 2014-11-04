'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var homes = require('../../app/controllers/homes');

	// Homes Routes
	app.route('/homes')
		.get(homes.list)
		.post(users.requiresLogin, homes.create);

	app.route('/homes/:homeId')
		.get(homes.read)
		.put(users.requiresLogin, homes.hasAuthorization, homes.update)
		.delete(users.requiresLogin, homes.hasAuthorization, homes.delete);

	// Finish by binding the Home middleware
	app.param('homeId', homes.homeByID);
};