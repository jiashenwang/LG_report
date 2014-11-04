'use strict';

// Invitations controller
angular.module('invitations').controller('InvitationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Invitations',
	function($scope, $stateParams, $location, Authentication, Invitations ) {
		$scope.authentication = Authentication;

		// Create new Invitation
		$scope.create = function() {
			// Create new Invitation object
			var invitation = new Invitations ({
				name: this.name
			});

			// Redirect after save
			invitation.$save(function(response) {
				$location.path('invitations/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Invitation
		$scope.remove = function( invitation ) {
			if ( invitation ) { invitation.$remove();

				for (var i in $scope.invitations ) {
					if ($scope.invitations [i] === invitation ) {
						$scope.invitations.splice(i, 1);
					}
				}
			} else {
				$scope.invitation.$remove(function() {
					$location.path('invitations');
				});
			}
		};

		// Update existing Invitation
		$scope.update = function() {
			var invitation = $scope.invitation ;

			invitation.$update(function() {
				$location.path('invitations/' + invitation._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Invitations
		$scope.find = function() {
			$scope.invitations = Invitations.query();
		};

		// Find existing Invitation
		$scope.findOne = function() {
			$scope.invitation = Invitations.get({ 
				invitationId: $stateParams.invitationId
			});
		};
	}
]);