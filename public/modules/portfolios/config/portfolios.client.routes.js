'use strict';

//Setting up route
angular.module('portfolios').config(['$stateProvider',
	function($stateProvider) {
		// Portfolios state routing
		$stateProvider.
		state('portfolio', {
			url: '/portfolios',
			templateUrl: 'modules/portfolios/views/index.portfolios.client.view.html',
			controller : 'PortfoliosController'
		}).
		state('portfolio.enrollment',{
			url : '/:enrollmentId',
			templateUrl: 'modules/portfolios/views/index.portfolios.client.view.html',
			controller : 'PortfoliosController'
		})
		// state('groupPortfolios',{
		// 	url : '/portfolios/:groupId',
		// 	templateUrl: 'modules/portfolios/views/index.portfolios.client.view.html',
		// 	controller : 'PortfoliosController'
		// })
	}
]);
