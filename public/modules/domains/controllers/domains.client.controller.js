'use strict';

// Domains controller
angular.module('domains').controller('DomainsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Domains',
	function($scope, $stateParams, $location, Authentication, Domains ) {
		$scope.authentication = Authentication;

		// Create new Domain
		$scope.create = function() {
			// Create new Domain object
			var domain = new Domains ({
				name: this.name
			});

			// Redirect after save
			domain.$save(function(response) {
				$location.path('domains/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Domain
		$scope.remove = function( domain ) {
			if ( domain ) { domain.$remove();

				for (var i in $scope.domains ) {
					if ($scope.domains [i] === domain ) {
						$scope.domains.splice(i, 1);
					}
				}
			} else {
				$scope.domain.$remove(function() {
					$location.path('domains');
				});
			}
		};

		// Update existing Domain
		$scope.update = function() {
			var domain = $scope.domain ;

			domain.$update(function() {
				$location.path('domains/' + domain._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Domains
		$scope.find = function() {
			$scope.domains = Domains.query();
		};

		// Find existing Domain
		$scope.findOne = function() {
			$scope.domain = Domains.get({ 
				domainId: $stateParams.domainId
			});
		};
	}
]);