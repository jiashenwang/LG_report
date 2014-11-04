'use strict';

//Setting up route
angular.module('homes').config(['$stateProvider',
	function($stateProvider) {
		// Homes state routing
		$stateProvider.
		state('indexHome', {
			url: '/home',
			templateUrl: 'modules/homes/views/index.home.client.view.html'
		})
	}
]);
