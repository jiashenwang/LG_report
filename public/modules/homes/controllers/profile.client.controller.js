'use strict';

angular.module('homes').controller('profileDialogController', ['$scope','$stateParams', '$location', 'Enrollments','Users','Groups','API','localStorageService','ngDialog','Invitations','Media',
  function($scope, $stateParams, $location,Enrollments,Users,Groups,API,localStorageService,ngDialog,Invitations,Media ) {

 $scope.upload = function($files) {
   console.log($scope.file)
   Media.media.post({},$.param({
     type : 'png',
     base64_file : $scope.file.base64
   }),function(media){
     console.log(media);
   },function(err){
     console.log(err);
   })
 }


  $scope.init = function(){
    $scope.name = localStorageService.get('displayName');
    $scope.email = localStorageService.get('email');
  }

  $scope.update = function(){
    Users.account.update({
      id : localStorageService.get('userId'),
    },$.param({
      display_name : $scope.name,
      primary_email : $scope.email,
      avatar_media_id : '',
    }),function(data){
      console.log(data);
      alert('Update Profile Succeed!');
    },function(err){
      console.log(err);
    })
  }

  $scope.updatePassword = function(){
    Users.password.update({
    },$.param({
      user_id : localStorageService.get('userId'),
      old_password : $scope.oldPassword,
      new_password : $scope.newPassword,
    }),function(data){
      console.log(data);
      alert('Update Password Succeed!');
    },function(err){
      console.log(err);
    })
  }
}

]);
