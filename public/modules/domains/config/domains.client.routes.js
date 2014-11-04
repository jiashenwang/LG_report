'use strict';

//Setting up route
angular.module('domains').config(['$stateProvider',
	function($stateProvider) {
		// Domains state routing
		$stateProvider.
		state('listDomains', {
			url: '/domains',
			templateUrl: 'modules/domains/views/list-domains.client.view.html'
		}).
		state('createDomain', {
			url: '/domains/create',
			templateUrl: 'modules/domains/views/create-domain.client.view.html'
		}).
		state('viewDomain', {
			url: '/domains/:domainId',
			templateUrl: 'modules/domains/views/view-domain.client.view.html'
		}).
		state('editDomain', {
			url: '/domains/:domainId/edit',
			templateUrl: 'modules/domains/views/edit-domain.client.view.html'
		});
	}
]);