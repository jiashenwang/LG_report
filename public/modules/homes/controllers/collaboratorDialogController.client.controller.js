'use strict';

angular.module('homes').controller('collaboratorDialogController', ['$scope', '$stateParams', '$location', 'Homes','Centers','Groups','API','localStorageService','ngDialog','Invitations',
  function($scope, $stateParams, $location, Homes,Centers,Groups,API,localStorageService,ngDialog,Invitations ) {

  $scope.invitations;

  $scope.init = function(){
    Groups.groupId.get({
      'id' : $scope.$parent.ngDialogData.groupId
    },function(group){
      console.log(group)
      $scope.invitations = group.invitations;
    })

  }

  $scope.inviteCollaborator = function(){

    Groups.invitation.generate({
      group_ids : $scope.$parent.ngDialogData.groupId,
    },$.param({
      user_display_name : $scope.create.name,
      user_avatar_media_id : '',
      create_user_id : localStorageService.get('userId')
    }),function(data){
      console.log(data);


      Groups.invitationSend.send(null,$.param({
        user_id : localStorageService.get('userId'),
        invitation_ids : data.id
      }),function(data){
          console.log(data);
      },function(err){
          console.log(err);
      })

      $scope.init();
    },function(err){
      console.log(err);
    })

  }

  $scope.deleteInvitation = function(invitationId){

    for(var i = 0;i<$scope.invitations.length;i++){
      console.log($scope.invitations[i].id);
      if( invitationId == $scope.invitations[i].id){
        $scope.invitations.splice(i, 1)
      }
    }
    Invitations.group.delete({
      invitation_id : invitationId,
      group_id : $scope.$parent.ngDialogData.groupId
    },
    null,
    function(data){
      console.log(data)
      console.log(invitationId);
      alert('Delete Invitaion Succeed!')
    },function(err){
      console.log(err);
    })
  }

}

]);
