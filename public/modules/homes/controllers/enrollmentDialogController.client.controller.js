'use strict';

angular.module('homes').controller('enrollmentDialogController', ['$scope', '$stateParams', '$location', 'Enrollments','Centers','Groups','API','localStorageService','ngDialog','Invitations',
  function($scope, $stateParams, $location,Enrollments,Centers,Groups,API,localStorageService,ngDialog,Invitations ) {

  $scope.enrollments;
  $scope.multiAdding = false;
  $scope.init = function(){
    Groups.groupId.get({
      'id' : $scope.$parent.ngDialogData.groupId
    },function(group){
      console.log(group)
      $scope.enrollments = group.enrollments;
    })

  }

  $scope.create = function(enrollmentName){

    Enrollments.enrollment.create({},$.param({
      display_name : $scope.multiAdding == false ? $scope.name : enrollmentName,
      avatar_media_id : '',
      group_id : $scope.$parent.ngDialogData.groupId

    }),function(enrollment){
      console.log(enrollment)
      $scope.init();
    },function(err){
      console.log(err);
    })
  }

  $scope.createMultiEnrollments = function(){
    var students;
    $scope.students.split("\n").length != 1 ? students = $scope.students.split("\n") : students = $scope.students.split("\t")

    for(var i = 0;i<students.length;i++){
      console.log(students);
      $scope.create(students[i]);
    }

    alert(students.length + ' Students Added!');
  }

  $scope.delete = function(id){
    Enrollments.enrollment.delete({
      id : id
    },{

    },function(enrollment){
      alert('Delete Student Succeed!');
      $scope.init();
    },function(err){
      console.log(err);
    })
  }

  $scope.toggleAdding = function(){
    $scope.multiAdding = !$scope.multiAdding;
  }

}

]);
