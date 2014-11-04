'use strict';

// Enrollments controller
angular.module('enrollments').controller('EnrollmentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Enrollments',
	function($scope, $stateParams, $location, Authentication, Enrollments ) {
		$scope.authentication = Authentication;

		// Create new Enrollment
		$scope.create = function() {
			// Create new Enrollment object
			var enrollment = new Enrollments ({
				name: this.name
			});

			// Redirect after save
			enrollment.$save(function(response) {
				$location.path('enrollments/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Enrollment
		$scope.remove = function( enrollment ) {
			if ( enrollment ) { enrollment.$remove();

				for (var i in $scope.enrollments ) {
					if ($scope.enrollments [i] === enrollment ) {
						$scope.enrollments.splice(i, 1);
					}
				}
			} else {
				$scope.enrollment.$remove(function() {
					$location.path('enrollments');
				});
			}
		};

		// Update existing Enrollment
		$scope.update = function() {
			var enrollment = $scope.enrollment ;

			enrollment.$update(function() {
				$location.path('enrollments/' + enrollment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Enrollments
		$scope.find = function() {
			$scope.enrollments = Enrollments.query();
		};

		// Find existing Enrollment
		$scope.findOne = function() {
			$scope.enrollment = Enrollments.get({ 
				enrollmentId: $stateParams.enrollmentId
			});
		};
	}
]);