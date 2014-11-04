'use strict';

angular.module('homes').controller('addGroupDialogController', ['$scope', '$stateParams', '$location', 'Homes','Centers','Groups','API','localStorageService','ngDialog',
  function($scope, $stateParams, $location, Homes,Centers,Groups,API,localStorageService,ngDialog ) {

  console.log(123);

  $scope.init = function(){

    $scope.domains = [];

    Groups.stages.get({},function(stages){
      console.log(stages);
      $scope.stages = stages;
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
    },function(err){
      console.log(err);
    })
  }

  $scope.create = function(){
    if($scope.stageId && $scope.portfolioId){
      Groups.group.create($.param({
        center_id : $scope.$parent.ngDialogData.centerId,
        portfolio_id : $scope.portfolioId.id,
        name : $scope.name,
        stage_id : $scope.stageId.id,
        icon_url : '',
      }),function(data){
        console.log(data);
        alert('Create Class Succeed!')
        $scope.closeThisDialog();
      },function(err){
        console.log(err);
      })
    }
    else{
      alert('Need More Info!')
    }


  }

}

]);
