'use strict';

angular.module('homes').controller('editGroupDialogController', ['$scope', '$stateParams', '$location', 'Homes','Centers','Groups','API','localStorageService','ngDialog',
  function($scope, $stateParams, $location, Homes,Centers,Groups,API,localStorageService,ngDialog ) {

  $scope.init = function(){
    $scope.domains = [];


    Groups.groupId.get({
      'id' : $scope.$parent.ngDialogData.groupId,
    },function(group){
      console.log(group)
      $scope.name = group.name

      // Reconstruct Filed Info After receive group info
      Groups.stages.get({},function(stages){
        console.log(stages);
        $scope.stages = stages;
        // Find the right id and put it back to the field
        for(var i = 0;i<stages.length;i++){
          if(stages[i].id == group.stage_id){
            $scope.stageId = stages[i];
          }
        }
      },function(err){
        console.log(err);
      })

      Groups.domains.get({},function(domains){
        console.log(domains);
        for(var i = 0;i<domains.length;i++){
          for(var k = 0;k<domains[i].child_domains.length;k++){
            $scope.domains.push({
              name : domains[i].child_domains[k].name,
              group : domains[i].name,
              id : domains[i].child_domains[k].id,
            })
          }
        }

        console.log($scope.domains.length);
        for(var i = 0;i<$scope.domains.length;i++){
          if($scope.domains[i].id == group.portfolio_id){
            $scope.portfolioId = $scope.domains[i];
            // console.log('I FInd It!');
            // console.log($scope.domains[i]);
          }
        }

      },function(err){
        console.log(err);
      })


    },function(err){
      console.log(err);
    })



  }

  $scope.update = function(){
    if($scope.stageId && $scope.portfolioId){
      Groups.groupEdit.update({
        center_id : $scope.$parent.ngDialogData.centerId,
        portfolio_id : $scope.portfolioId.id,
        name : $scope.name,
        stage_id : $scope.stageId.id,
        id : $scope.$parent.ngDialogData.groupId,
        icon_url : '',
      },function(data){
        console.log(data);
        alert('Update Class Succeed!')
        $scope.closeThisDialog();
        location.reload();
      },function(err){
        console.log(err);
      })
    }
    else{
      alert('Need More Info!')
    }
  }

  $scope.delete = function(){
    if(confirm('Do you really want to delete this Class?')){
      Groups.groupEdit.delete({
        id : $scope.$parent.ngDialogData.groupId,
      },function(data){
        alert('Delete Class Succeed!')
        $scope.closeThisDialog();
        location.reload();
      },function(err){
        console.log(err);
        if(err.status == 400){
          alert('Can not delete class that has students or teachers!');
        }
      })
    }

  }


}

]);
