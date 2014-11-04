'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication','API',
	function($scope, Authentication,API) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		console.log(API);
		// console.log(API.user.login)
	}
]);
