'use strict';

// Portfolios controller
angular.module('portfolios').controller('PortfoliosController', ['$scope', '$stateParams', '$location', 'Portfolios','Centers','localStorageService','Groups','Notes',
	function($scope, $stateParams, $location, Portfolios,Centers,localStorageService,Groups,Notes ) {

	/** @type {Array} [Formatted Groups data] */
	$scope.groups = [];

	/** @type {Array} [Enrollments data for selected Group] */
	$scope.enrollments = [];

	/** @type {Object} [Selected Enrollment] */
	$scope.enrollment = {};

	/** @type {Array} [Notes for selected Enrollment] */
	$scope.notes = [];

	console.log($stateParams);

	console.log($location.path());


	/**
	 * @date 2014-11-02 01:27
	 * @author Martin
	 *
	 * Init function for this controller
	 */
	$scope.init = function(){

		Centers.ownerId.get({
			owner_id : localStorageService.get('userId')
		},function(centers){
			$scope.centers = centers;
			console.log(centers)

			$scope.preProcessGroups(centers);

			if($stateParams.enrollmentId){
				$scope.selectAEnrollment($stateParams.enrollmentId);
			}

		},function(err){
			console.log(err);
		})

	}

	/**
	 * @date 2014-11-02 00:50
	 * @author Martin
	 *
	 * After received all Groups data, do a little process to format those raw data
	 * so that we can display all Groups in the drop-down list and group them by
	 * center anmes.
	 */
	$scope.preProcessGroups = function(centers){
		for(var i = 0;i<centers.length;i++){
			for(var j = 0;j<centers[i].groups.length;j++){
				console.log('about to push');
				$scope.groups.push({
					centerName : centers[i].name,
					centerId : centers[i].id,
					groupName : centers[i].groups[j].name,
					groupId : centers[i].groups[j].id
				})
			}
		}

		if($stateParams.groupId){
			console.log('about to init group');
			for(var i = 0;i<$scope.groups.length;i++){
				if($stateParams.groupId == $scope.groups[i].groupId){
					$scope.group = $scope.groups[i];
					$scope.selectAGroup(true);
				}
			}
		}
	}

	/**
	 * @author Martin
	 * @date 2014-11-02 01:29
	 *
	 * Get Enrollment data for selected Group
	 */
	$scope.selectAGroup = function(urlRequest){

		/**
		 * Have to reset Enrollment releated vars since we selected a new Group
		 */
		if(!urlRequest){
			$scope.enrollment = null;
			$stateParams.enrollmentId = null;
		}

		console.log($stateParams);


		$stateParams.groupId = $scope.group.groupId;
		$scope.updateLocationPath();

		Groups.groupId.get({
			'id' : $scope.group.groupId
		},function(group){
			console.log(group);
			$scope.enrollments = group.enrollments
		},function(err){
			console.log(err);
		})
	}

	/**
	 * @author Martin
	 * @date 2014-11-02 01:02 (lol we gained an hour for free!)
	 *
	 * Get Portfolio data for selected Enrollment
	 */
	$scope.selectAEnrollment = function(enrollmentId){

		console.log(enrollmentId);
		//
		if($stateParams.enrollmentId != enrollmentId || !$scope.enrollment.id){
			for(var i = 0;i<$scope.enrollments.length;i++){
				enrollmentId == $scope.enrollments[i].id ? $scope.enrollment = $scope.enrollments[i]: 1 == 1;
			}
			$stateParams.enrollmentId = $scope.enrollment.id;
			// $scope.updateLocationPath();
		}

		$location.path('portfolios/'+$stateParams.groupId+'/'+$stateParams.enrollmentId)


$scope.$on('$stateChangeStart',
function(event, toState, toParams, fromState, fromParams){
    event.preventDefault();
    // transitionTo() promise will be rejected with
    // a 'transition prevented' error

})


		Notes.note.enrollmentId({
			'enrollment_id' : $scope.enrollment.id,
			'before_time' : '2115-01-01',
			'count' : 10000,
			'note_category' : 'portfolio',

		},{},function(notes){
			console.log(notes)
			$scope.notes = notes;
		},function(err){
			console.log(err);
		})
	}

	/**
	 * @author Martin
	 * @date 2014-11-02 01:49
	 *
	 * I just think that we need a functin to manage both GroupId and EnrollmentId
	 * at the same place and update them at the same time as well
	 */
	$scope.updateLocationPath = function(){
		if($stateParams.groupId && !$stateParams.enrollmentId){
			console.log('only groupId')
			$location.path('portfolios/'+$stateParams.groupId);
		}

		if($stateParams.groupId && $stateParams.enrollmentId){
			console.log('both groupId and enrollmentId')
			$location.path('portfolios/'+$stateParams.groupId+'/'+$stateParams.enrollmentId);
		}

	}

	}
]);
