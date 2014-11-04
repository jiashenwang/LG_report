'use strict';

// Homes controller
angular.module('homes').controller('HomesController', ['$scope', '$stateParams', '$location', 'Homes','Centers','Groups','API','localStorageService','ngDialog',
	function($scope, $stateParams, $location, Homes,Centers,Groups,API,localStorageService,ngDialog) {

		// If user is signed in then redirect back home
		// if (!$scope.authentication.user){
		// 	console.log($scope.authentication.user);
		// 	$location.path('/login');
		// }
		// else{
		// 	console.log($scope.authentication.user);
		// }

		$scope.currentCenterId;

		$scope.init = function(){
			// Set User Info into screen
			$scope.displayName = localStorageService.get('displayName');

			Centers.ownerId.get({
				owner_id : localStorageService.get('userId')
			},function(centers){
				$scope.centers = centers;
				console.log(centers)

				if(centers[0]){
					$scope.currentCenterId = centers[0].id
					$scope.initGroups($scope.currentCenterId)
				}

			},function(err){
				console.log(err);
			})
		}

		$scope.initGroups = function(centerId){
			Groups.centerId.get({
				center_id : centerId
			},function(groups){
				$scope.groups = groups;
				console.log(groups)

				for(var i = 0;i<groups.length;i++){
					Groups.groupId.get({
						'id' : groups[i].id
					},function(group){
						console.log(group)

						for(var k = 0; k<$scope.groups.length;k++){
							if($scope.groups[k].id == group.id){
								$scope.groups[k].collaboratorCount = group.collaborators.length;
								$scope.groups[k].enrollmentCount = group.enrollments.length;
							}
						}

					})
				}

			},function(err){
				console.log(err);
			})
		}
		// Create new Home
		$scope.create = function() {
			// Create new Home object
			var home = new Homes ({
				name: this.name
			});

			// Redirect after save
			home.$save(function(response) {
				$location.path('homes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.openAddGroupDialog = function(){
			ngDialog.open({
				template: 'modules/homes/views/ngDialog/addGroup.dialog.client.view.html',
				className: 'ngdialog-theme-default',
				controller : 'addGroupDialogController',
				// scope :$scope,
				data : {
					centerId : $scope.currentCenterId
				}
			});
		}

		$scope.openEditGroupDialog = function(groupId){
			ngDialog.open({
				template: 'modules/homes/views/ngDialog/editGroup.dialog.client.view.html',
				className: 'ngdialog-theme-default',
				controller : 'editGroupDialogController',
				// scope :$scope,
				data : {
					groupId : groupId
				}
			});
		}

		$scope.openCollaboratorDialog = function(groupId){
			ngDialog.open({
				template: 'modules/homes/views/ngDialog/collaborator.dialog.client.view.html',
				className: 'ngdialog-theme-default',
				controller : 'collaboratorDialogController',
				// scope :$scope,
				data : {
					groupId : groupId
				}
			});
		}

		$scope.openEnrollmentDialog = function(groupId){
			console.log(123);
			ngDialog.open({
				template: 'modules/homes/views/ngDialog/enrollment.dialog.client.view.html',
				className: 'ngdialog-theme-default',
				controller : 'enrollmentDialogController',
				// scope :$scope,
				data : {
					groupId : groupId
				}
			});
		}

		$scope.openProfileDialog = function(groupId){
			console.log(123);
			ngDialog.open({
				template: 'modules/homes/views/ngDialog/profile.dialog.client.view.html',
				className: 'ngdialog-theme-default',
				controller : 'profileDialogController',
				// scope :$scope,
			});
		}

	}
]);
