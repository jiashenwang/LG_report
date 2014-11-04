'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var enrollments = require('../../app/controllers/enrollments');

	// Enrollments Routes
	app.route('/enrollments')
		.get(enrollments.list)
		.post(users.requiresLogin, enrollments.create);

	app.route('/enrollments/:enrollmentId')
		.get(enrollments.read)
		.put(users.requiresLogin, enrollments.hasAuthorization, enrollments.update)
		.delete(users.requiresLogin, enrollments.hasAuthorization, enrollments.delete);

	// Finish by binding the Enrollment middleware
	app.param('enrollmentId', enrollments.enrollmentByID);
};