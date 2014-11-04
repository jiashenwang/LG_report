'use strict';

//Setting up route
angular.module('reports').config(['$stateProvider',
	function($stateProvider) {
		// Reports state routing
		$stateProvider.
		state('reports', {
			url: '/reports',
			templateUrl: 'modules/reports/views/index-reports.client.view.html'
		});
	}
]);