'use strict';

//Setting up route
angular.module('enrollments').config(['$stateProvider',
	function($stateProvider) {
		// Enrollments state routing
		$stateProvider.
		state('listEnrollments', {
			url: '/enrollments',
			templateUrl: 'modules/enrollments/views/list-enrollments.client.view.html'
		}).
		state('createEnrollment', {
			url: '/enrollments/create',
			templateUrl: 'modules/enrollments/views/create-enrollment.client.view.html'
		}).
		state('viewEnrollment', {
			url: '/enrollments/:enrollmentId',
			templateUrl: 'modules/enrollments/views/view-enrollment.client.view.html'
		}).
		state('editEnrollment', {
			url: '/enrollments/:enrollmentId/edit',
			templateUrl: 'modules/enrollments/views/edit-enrollment.client.view.html'
		});
	}
]);