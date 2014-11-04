'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('login', {
			url: '/login',
			templateUrl: 'modules/users/views/login.client.view.html'
		}).
		state('register', {
			url: '/register',
			templateUrl: 'modules/users/views/register/parent.register.client.view.html'
		}).
		state('parentRegister', {
			url: '/register/parent',
			templateUrl: 'modules/users/views/register/parent.register.client.view.html'
		}).
		state('ownerRegister', {
			url: '/register/owner',
			templateUrl: 'modules/users/views/register/owner.register.client.view.html'
		}).
		state('collaboratorRegister', {
			url: '/register/collaborator',
			templateUrl: 'modules/users/views/register/collaborator.register.client.view.html'
		})

	}
]);
