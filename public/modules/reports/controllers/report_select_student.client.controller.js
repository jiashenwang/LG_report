'use strict';

// Reports controller
angular.module('reports').controller('reportsStudentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reports','Centers','localStorageService','Groups','Notes','$filter','ngDialog',
  function($scope, $stateParams, $location, Authentication, Reports, Centers,localStorageService,Groups,Notes,$filter,ngDialog ) {
    $scope.authentication = Authentication;

    $scope.updateCheckboxStudents = function(){
      $scope.selectedStudents = [];
      for(var i = 0;i<$scope.$parent.studentsActList.length;i++){
        if($scope.$parent.studentsActList[i].id_str){
          $scope.selectedStudents.push($scope.$parent.studentsActList[i].id_str);
        }
        else if($scope.$parent.studentsActList[i].id){
          $scope.selectedStudents.push($scope.$parent.studentsActList[i].id);
        }
      }
      console.log($scope.selectedStudents)
    }

    $scope.selectedStudents = [];
    $scope.updateCheckboxStudents();

    if($scope.$parent.ngDialogData.studentsList){
      $scope.studentsList = $scope.$parent.ngDialogData.studentsList
    }
    else if($scope.$parent.studentsList){
      $scope.studentsList = $scope.$parent.studentsList
    }


    $scope.toggleSelection = function toggleSelection(student) {
      console.log(student.id);

      // var idx = $scope.$parent.selectedStudents.indexOf(student.id);

      var idx = -1;

      for(var i = 0;i<$scope.$parent.studentsActList.length;i++){
        if($scope.$parent.studentsActList[i].id === student.id){
          idx = i;
        }
      }
      // is currently selected
      if (idx > -1) {
        $scope.$parent.studentsActList.splice(idx, 1);
      }
      // is newly selected
      else {
        $scope.$parent.studentsActList.push(student);
      }
      $scope.updateCheckboxStudents();

      console.log($scope.$parent.studentsActList);
    };

  }
]);