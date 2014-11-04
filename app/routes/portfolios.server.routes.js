'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var portfolios = require('../../app/controllers/portfolios');

	// Portfolios Routes
	app.route('/portfolios')
		.get(portfolios.list)
		.post(users.requiresLogin, portfolios.create);

	app.route('/portfolios/:portfolioId')
		.get(portfolios.read)
		.put(users.requiresLogin, portfolios.hasAuthorization, portfolios.update)
		.delete(users.requiresLogin, portfolios.hasAuthorization, portfolios.delete);

	// Finish by binding the Portfolio middleware
	app.param('portfolioId', portfolios.portfolioByID);
};