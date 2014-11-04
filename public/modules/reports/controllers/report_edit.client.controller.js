'use strict';

// Reports controller
angular.module('reports').controller('ReportsEditController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reports','Centers','localStorageService','Groups','Notes','$filter','ngDialog','Media',
  function($scope, $stateParams, $location, Authentication, Reports, Centers,localStorageService,Groups,Notes,$filter,ngDialog,Media ) {
    $scope.authentication = Authentication;


      $scope.hstep = 1;
      $scope.mstep = 1;

      $scope.origin_note = "";
      $scope.isDisabled = true;

      //$scope.studentsList=[];
      $scope.studentsActList = [];

    

      $scope.isActivity = function(){
        return ($scope.origin_note.type == "Activity");
      }
      $scope.isNap = function(){
        return ($scope.origin_note.type == "Nap");
      }
      $scope.isPotty = function(){
        return ($scope.origin_note.type == "Potty");
      }
      $scope.isDiaper = function(){
        return ($scope.origin_note.type == "Diapper");
      }
      $scope.isMeal = function(){
        return ($scope.origin_note.type == "Meal");
      }
      $scope.isBottle = function(){
        return ($scope.origin_note.type == "Bottle");
      }
      $scope.isMood = function(){
        return ($scope.origin_note.type == "Mood");
      }
      $scope.isReminder = function(){
        return ($scope.origin_note.type == "Reminder");
      }
      $scope.isSong = function(){
        return ($scope.origin_note.type == "Song");
      }
      $scope.isReading = function(){
        return ($scope.origin_note.type == "Reading");
      }
      $scope.isIncident = function(){
        return ($scope.origin_note.type == "Incident");
      }
      $scope.isOther = function(){
        return ($scope.origin_note.type == "Other");
      }



      $scope.removePic = function(id){
        for(var i=0; i<$scope.mediaList.length; i++){
          if($scope.mediaList[i].id == id){
            $scope.mediaList.splice(i, 1);
          }
        }
      }

     $scope.upload = function($file) {
      if($scope.mediaList.length >=4){
        alert("sorry, you can only upload at most 4 pictures at once.");
      }else if (!$scope.file){
        alert("nothing to upload!");
      }else{
         console.log($scope.file);
         //console.log($scope.file.filetype);
         
         Media.media.post({},$.param({
           type : $scope.file.filetype,
           base64_file : $scope.file.base64
         }),function(media){
           console.log(media);
           $scope.mediaList.push({'id':media.id, 'public_url':media.public_url});
         },function(err){
           console.log(err);
         })
      }
     }

      $scope.openStudentsListPopup = function(){
        ngDialog.open({
          template: '/modules/reports/views/dialogs/select-students.client.view.html',
          className: 'ngdialog-theme-default',
          controller : 'reportsStudentsController',
          scope: $scope,          
          data : {
            studentsList : $scope.studentsList,
            addFlag : true
          },
          preCloseCallback: function(value) {
            console.log($scope.studentsActList);
          }
        });
      }     

      $scope.init = function(){


/*
        Groups.groupId.get({
          'id' : localStorageService.get('groupID')
        },function(data){
          console.log(data);
          $scope.studentsList = data.enrollments
          console.log($scope.studentsList);

        },function(err){
          console.log(err);
        })      
*/

        Notes.noteSpecial.get({},{
            noteId : localStorageService.get( 'reportID')
        },function(data){
          console.log(data);
          $scope.origin_note = data; 
          $scope.mediaList = $scope.origin_note.media;
          $scope.children = $scope.origin_note.children;  
          $scope.studentsActList = $scope.origin_note.children;

          if($scope.isActivity()){
            $scope.report_detail = $scope.origin_note.payload;
          }
          else if($scope.isNap()){
            $scope.report_detail = $scope.origin_note.payload;
            $scope.from = $scope.origin_note.from_date;
            $scope.to = $scope.origin_note.to_date;
          }
          else if($scope.isPotty()){
            $scope.report_detail = $scope.origin_note.payload;
            $scope.from = $scope.origin_note.from_date;
            $scope.condition_potty1 = $scope.origin_note.props[0].meta_value;
            $scope.condition_potty2 = $scope.origin_note.props[1].meta_value;
          }
          else if($scope.isDiaper()){
            $scope.report_detail = $scope.origin_note.payload;
            $scope.from = $scope.origin_note.from_date;
            $scope.condition_diapper = $scope.origin_note.props[0].meta_value;
          }
          else if($scope.isMeal()){
            $scope.report_detail = $scope.origin_note.payload;
            $scope.from = $scope.origin_note.from_date;
            $scope.condition_meal = $scope.origin_note.props[0].meta_value;
          }
          else if($scope.isBottle()){
            $scope.report_detail = $scope.origin_note.payload;
            $scope.from = $scope.origin_note.from_date;
            $scope.oz = $scope.origin_note.props[0].meta_value;
            $scope.condition_food = $scope.origin_note.props[1].meta_value;
          }
          else if($scope.isMood()){
            $scope.condition_mood = $scope.origin_note.payload;
          }
          else if($scope.isReminder()){
            $scope.report_detail = $scope.origin_note.payload;
            for(var i=0; i<$scope.origin_note.props.length; i++){
              if($scope.origin_note.props[i].meta_value == "wipe"){
                $scope.checkModel_wipe = true;
              }
              else if($scope.origin_note.props[i].meta_value == "clothing"){
                $scope.checkModel_clothing = true;
              }
              else if($scope.origin_note.props[i].meta_value == "sunscreen"){
                $scope.checkModel_sunscreen = true;
              }
              else if($scope.origin_note.props[i].meta_value == "diaper"){
                $scope.checkModel_diaper = true;
              }
            }
          }
          else if($scope.isSong()){
            $scope.report_detail = $scope.origin_note.payload;
          }
          else if($scope.isReading()){
            $scope.report_detail = $scope.origin_note.payload;
          }
          else if($scope.isIncident()){
            $scope.report_detail = $scope.origin_note.payload;
            for(var i=0; i<$scope.origin_note.props.length; i++){

              if($scope.origin_note.props[i].meta_value == "Potty accident"){
                $scope.checkModel_potty = true;
              }
              else if($scope.origin_note.props[i].meta_value == "Injury"){
                $scope.checkModel_injury = true;
              }
            }        
          }
          else if($scope.isOther()){
            $scope.report_detail = $scope.origin_note.payload;
          }     

        },function(err){
            console.log(err)
        }); 
      }  

     $scope.edit_report = function(){
        if(($scope.isBottle() && isNaN($scope.oz)) || $scope.oz>20 || $scope.oz<=0){
          alert("invaild oz input!");
        }else{
                var studentsIDList = [];
                var enrollments ='[';
                var temp_props = "";
                var temp_medias = "";
                var temp_from_date = $filter('date')(new Date(), 'HH:mm:ss');
                var temp_to_date = $filter('date')(new Date(), 'HH:mm:ss');

                if($scope.isActivity()){
                  for(var i=0; i<$scope.mediaList.length ;i++){
                      if(temp_medias == ""){
                          temp_medias = $scope.mediaList[i].id;
                      }else{
                          temp_medias = temp_medias+","+$scope.mediaList[i].id;
                      }
                  }
                }
                else if($scope.isNap()){
                  temp_from_date = $filter('date')($scope.from, 'HH:mm:ss')
                  temp_to_date = $filter('date')($scope.to, 'HH:mm:ss');
                }
                else if($scope.isPotty()){
                  temp_from_date = $filter('date')($scope.from, 'HH:mm:ss');
                  temp_to_date = $filter('date')($scope.from, 'HH:mm:ss');

                  temp_props='result:'.concat($scope.condition_potty1,',action:', $scope.condition_potty2);

                }
                else if($scope.isDiaper()){
                  temp_from_date = $filter('date')($scope.from, 'HH:mm:ss');
                  temp_to_date = $filter('date')($scope.from, 'HH:mm:ss');

                  temp_props = 'detail:'.concat($scope.condition_diapper);
                  alert(temp_props);

                }
                else if($scope.isMeal()){
                  temp_from_date = $filter('date')($scope.from, 'HH:mm:ss');
                  temp_to_date = $filter('date')($scope.from, 'HH:mm:ss');

                  temp_props = 'portion:'.concat($scope.condition_meal);

                }
                else if($scope.isBottle()){
                  temp_from_date = $filter('date')($scope.from, 'HH:mm:ss');
                  temp_to_date = $filter('date')($scope.from, 'HH:mm:ss');

                  temp_props = 'portion:'.concat($scope.oz,',bottletype:', $scope.condition_food);
                }
                else if($scope.isMood()){
                  temp_payload = $scope.condition_mood;
                }
                else if($scope.isReminder()){
                   if($scope.checkModel_wipe==true || $scope.checkModel_clothing==true 
                          || $scope.checkModel_sunscreen==true || $scope.checkModel_diaper==true){
                      if($scope.checkModel_wipe){
                        temp_props = 'bring:wipe';
                      }
                      if($scope.checkModel_clothing){
                        if(temp_props == ""){
                          temp_props = 'bring:clothing';
                        }else{
                          temp_props = temp_props.concat(",bring:clothing");
                        }
                      }
                      if($scope.checkModel_sunscreen){
                        if(temp_props == ""){
                          tempStr = 'bring:sunscreen';
                        }else{
                          temp_props = temp_props.concat(",bring:sunscreen");
                        }
                      }
                      if($scope.checkModel_diaper){
                        if(temp_props == ""){
                          temp_props = 'bring:diaper';
                        }else{
                          temp_props = temp_props.concat(",bring:diaper");
                        }
                      }
                   }
                }
                else if($scope.isIncident()){
                  if($scope.checkModel_potty == true || $scope.checkModel_injury == true){
                    if($scope.checkModel_potty == true){
                      temp_props = 'detail:Potty accident';
                    }
                    if($scope.checkModel_injury == true && $scope.checkModel_potty == true){
                      temp_props = temp_props.concat(',detail:Injury');
                    }
                    else if($scope.checkModel_injury == true && $scope.checkModel_potty == false){
                      temp_props = 'detail:Injury';
                    }
                  }      
                }
                  // convert to id list
                for(var i=0; i<$scope.studentsActList.length; i++){
                  if($scope.studentsActList[i].id_str){
                      studentsIDList.push($scope.studentsActList[i].id_str);
                    }else{
                        studentsIDList.push($scope.studentsActList[i].id);
                    }
                }

                if($scope.studentsActList.length <= 0){
                    Notes.noteSpecial.delete({},{
                        noteId : localStorageService.get( 'reportID')
                    },function(data){
                        console.log("remove report successfully!");           
                    },function(err){
                      console.log(err)
                    }) 
                }else{

                    Notes.noteSpecial.update($.param({
                            //'title' : data.title,
                            'updateTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
                            'type' : $scope.origin_note.type,
                            'Children' : studentsIDList.join(','),
                            'user_id' : localStorageService.get('userId'),
                            'payload' : $scope.report_detail,
                            'from' : temp_from_date,
                            'to' : temp_to_date,
                            'medias' : temp_medias,
                            'props' : temp_props,

                        },{
                            noteId : localStorageService.get( 'reportID')})
                        ,function(value){
                          alert("Note update successfully!");
                        },function(err){
                            console.log(err)
                        })  

                }



        }
     }


      $scope.init();

  }
]);