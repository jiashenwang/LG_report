'use strict';

// Reports controller
angular.module('reports').controller('ReportsAddController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reports','Centers','localStorageService','Groups','Notes','$filter','ngDialog','Media','$http',
  function($scope, $stateParams, $location, Authentication, Reports, Centers,localStorageService,Groups,Notes,$filter,ngDialog,Media,$http) {
    $scope.authentication = Authentication;
    $scope.condition = "Wet";
    $scope.condition_potty1 = "Succeed";
    $scope.condition_potty2 = "Urianated";
    $scope.condition_mood = "Cheerful";
    $scope.condition_food = "breast milk";
    $scope.condition_meal = "all";
    $scope.studentsActList = [];

    $scope.mediaList = [];


    console.log($scope.studentsList);

    // for timeer 
    $scope.hstep = 1;
    $scope.mstep = 1;

    if($scope.from && $scope.to){

    }else{
      $scope.from = new Date();
      $scope.to = new Date();
    }

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };


    var tabClasses;
    
    function initTabs() {
      tabClasses = ["","","","","","","","","","","",""];
    } 
    
    $scope.getTabClass = function (tabNum) {
      return tabClasses[tabNum];
    };
    
    $scope.getTabPaneClass = function (tabNum) {
      return "tab-pane " + tabClasses[tabNum];
    }
    
    $scope.setActiveTab = function (tabNum) {

      if(tabClasses[tabNum] !== "active"){
        console.log("clear~");
        $scope.report_detail="";
        $scope.reportID=null;
        $scope.studentsActList = [];
        $scope.studentsActList = [];
      }

      initTabs();
      tabClasses[tabNum] = "active";
    };
    
    
    //Initialize 
    initTabs();
    console.log("initialize!~");
    $scope.setActiveTab(1);  

    // ================================ END OF INITIAL ==============================

    $scope.openStudentsListPopup = function(){
      console.log($scope.studentsList);
      ngDialog.open({
        template: '/modules/reports/views/dialogs/select-students.client.view.html',
        className: 'ngdialog-theme-default',
        controller : 'reportsStudentsController',
        scope: $scope,
        preCloseCallback: function(value) {
          console.log($scope.studentsActList);
        }
      });
    }

   $scope.upload = function($files) {
    if($scope.mediaList.length >=4){
      alert("sorry, you can only upload at most 4 pictures at once.");
    }else{
       console.log($scope.file);
       //console.log($scope.file.filetype);
       Media.media.post({},$.param({
         type : $scope.file.filetype,
         base64_file : $scope.file.base64
       }),function(media){
         console.log(media);
         $scope.mediaList.push({'id':media.id, 'url':media.public_url});
       },function(err){
         console.log(err);
       })
    }
   }

   $scope.removePic = function(id){
      for(var i=0; i<$scope.mediaList.length; i++){
        if($scope.mediaList[i].id == id){
          $scope.mediaList.splice(i, 1);
        }
      }
   }
  

  //===================  new note begins here ===============================
  $scope.addNotes_activity = function($report_detail){

    if($scope.studentsActList.length!=0){
        var studentsIDList = [];
        //var enrollments ='[';

        for(var i=0; i<$scope.studentsActList.length; i++){
          studentsIDList.push($scope.studentsActList[i].id);
        }


        var temp_medias = "";

        for(var i=0; i<$scope.mediaList.length ;i++){
            if(temp_medias == ""){
                temp_medias = $scope.mediaList[i].id;
            }else{
                temp_medias = temp_medias+","+$scope.mediaList[i].id;
            }
        }

            Notes.note.post($.param({
              'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
              'type' : 'Activity',
              'Children' : studentsIDList.join(','),
              'user_id' : localStorageService.get('userId'),
              'payload' : $report_detail,
              'medias' : temp_medias

            }),function(data){
              console.log(data);
              alert("adding report successfully!");

              $scope.reportID = data.id;
              console.log($scope.reportID);


              console.log("report added!!!!!!!!!!!!!!!!!!!!!!!");

            },function(err){
              console.log(err)
            })

      }else{
        alert("sorry, you need to add at least one child.");
      }


  } 

// adding nap===========================================
  $scope.addNotes_nap = function($report_detail, $from, $to){


    if($from && $to && $from<$to){
      if($scope.studentsActList.length!=0){
          var studentsIDList = [];

          for(var i=0; i<$scope.studentsActList.length; i++){
            studentsIDList.push($scope.studentsActList[i].id);
          }


          // create a new note
              Notes.note.post($.param({
                'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
                'type' : 'Nap',
                'Children' : studentsIDList.join(','),
                'user_id' : localStorageService.get('userId'),
                'payload' : $report_detail,
                'from' : $filter('date')($from, 'HH:mm:ss'),
                'to' : $filter('date')($to, 'HH:mm:ss')

              }),function(data){
                console.log(data);
                alert("adding report successfully!");

                $scope.reportID = data.id;
                console.log($scope.reportID);


                console.log("report added!!!!!!!!!!!!!!!!!!!!!!!");

              },function(err){
                console.log(err)
              })

        }else{
          alert("sorry, you need to add at least one child.");
        }
    }else{
      alert("The time input is invalid!");
    }

  }

  // adding diaper
  $scope.addNotes_diapper = function(report_detail, from, condition){
    if($scope.studentsActList.length!=0){
        var studentsIDList = [];

        for(var i=0; i<$scope.studentsActList.length; i++){
          studentsIDList.push($scope.studentsActList[i].id);
        }



        var tempStr = 'detail:'.concat(condition);
        // create a new note
            Notes.note.post($.param({
              'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
              'type' : 'Diapper',
              'Children' :  studentsIDList.join(','),
              'user_id' : localStorageService.get('userId'),
              'payload' : report_detail,
              'from' : $filter('date')(from, 'HH:mm:ss'),
              'to' : $filter('date')(from, 'HH:mm:ss'),
              'props' : tempStr

            }),function(data){
              console.log(data);
              alert("adding Diaper report successfully!");

              $scope.reportID = data.id;
              console.log($scope.reportID);


              console.log("report added!!!!!!!!!!!!!!!!!!!!!!!");

            },function(err){
              console.log(err)
            })

      }else{
        alert("sorry, you need to add at least one child.");
      }   
  }

  $scope.addNotes_potty = function(from, condition1, condition2){
    if($scope.studentsActList.length!=0){
        var studentsIDList = [];
        var enrollments ='[';

        for(var i=0; i<$scope.studentsActList.length; i++){
          studentsIDList.push($scope.studentsActList[i].id);
        }

        // create a new note
            var tempStr = 'result:'.concat(condition1,',action:', condition2);

            Notes.note.post($.param({
              'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
              'type' : 'Potty',
              'Children' : studentsIDList.join(','),
              'user_id' : localStorageService.get('userId'),
              'from' : $filter('date')(from, 'HH:mm:ss'),
              'to' : $filter('date')(from, 'HH:mm:ss'),
              'props' : tempStr

            }),function(data){
              console.log(data);
              alert("adding potty report successfully!");

              $scope.reportID = data.id;
              console.log($scope.reportID);


              console.log("potty report added!!!!!!!!!!!!!!!!!!!!!!!");

            },function(err){
              console.log(err)
            })

      }else{
        alert("sorry, you need to add at least one child.");
      }      
  }

  $scope.addNotes_mood = function(condition){
    if($scope.studentsActList.length!=0){
        var studentsIDList = [];

        for(var i=0; i<$scope.studentsActList.length; i++){
          studentsIDList.push($scope.studentsActList[i].id);
        }

        // create a new note

            Notes.note.post($.param({
              'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
              'type' : 'Mood',
              'Children' : studentsIDList.join(','),
              'user_id' : localStorageService.get('userId'),
              'from' : $filter('date')(new Date(), 'HH:mm:ss'),
              'to' : $filter('date')(new Date(), 'HH:mm:ss'),              
              'payload' : condition

            }),function(data){
              console.log(data);
              alert("adding potty report successfully!");

              $scope.reportID = data.id;
              console.log($scope.reportID);

              console.log("mood report added!!!!!!!!!!!!!!!!!!!!!!!");

            },function(err){
              console.log(err)
            })

      }else{
        alert("sorry, you need to add at least one child.");
      }      
  }

  $scope.addNotes_song = function(report_detail){
     if($scope.studentsActList.length!=0){
        var studentsIDList = [];

        for(var i=0; i<$scope.studentsActList.length; i++){
          studentsIDList.push($scope.studentsActList[i].id);
        }

        // create a new note

            Notes.note.post($.param({
              'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
              'type' : 'Mood',
              'Children' : studentsIDList.join(','),
              'user_id' : localStorageService.get('userId'),
              'from' : $filter('date')(new Date(), 'HH:mm:ss'),
              'to' : $filter('date')(new Date(), 'HH:mm:ss'),              
              'payload' : report_detail

            }),function(data){
              console.log(data);
              alert("adding song report successfully!");

              $scope.reportID = data.id;
              console.log($scope.reportID);

              console.log("song report added!!!!!!!!!!!!!!!!!!!!!!!");

            },function(err){
              console.log(err)
            })

      }else{
        alert("sorry, you need to add at least one child.");
      }    
  }

  $scope.addNotes_reading = function(report_detail){
     if($scope.studentsActList.length!=0){
        var studentsIDList = [];

        for(var i=0; i<$scope.studentsActList.length; i++){
          studentsIDList.push($scope.studentsActList[i].id);
        }

        // create a new note

            Notes.note.post($.param({
              'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
              'type' : 'Reading',
              'Children' : studentsIDList.join(','),
              'user_id' : localStorageService.get('userId'),
              'from' : $filter('date')(new Date(), 'HH:mm:ss'),
              'to' : $filter('date')(new Date(), 'HH:mm:ss'),              
              'payload' : report_detail

            }),function(data){
              console.log(data);
              alert("adding reading report successfully!");

              $scope.reportID = data.id;
              console.log($scope.reportID);


              console.log("reading report added!!!!!!!!!!!!!!!!!!!!!!!");

            },function(err){
              console.log(err)
            })

      }else{
        alert("sorry, you need to add at least one child.");
      }    
  }

  $scope.addNotes_other = function(report_detail){
     if($scope.studentsActList.length!=0){
        var studentsIDList = [];

        for(var i=0; i<$scope.studentsActList.length; i++){
          studentsIDList.push($scope.studentsActList[i].id);
        }

        // create a new note

            Notes.note.post($.param({
              'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
              'type' : 'Other',
              'Children' : studentsIDList.join(','),
              'user_id' : localStorageService.get('userId'),
              'from' : $filter('date')(new Date(), 'HH:mm:ss'),
              'to' : $filter('date')(new Date(), 'HH:mm:ss'),              
              'payload' : report_detail

            }),function(data){
              console.log(data);
              alert("adding reading report successfully!");

              $scope.reportID = data.id;
              console.log($scope.reportID);


              console.log("other report added!!!!!!!!!!!!!!!!!!!!!!!");

            },function(err){
              console.log(err)
            })

      }else{
        alert("sorry, you need to add at least one child.");
      }       
  }
     
  $scope.addNotes_incident = function(report_detail, checkbox1, checkbox2){
       

       if($scope.studentsActList.length!=0){
        var studentsIDList = [];

        for(var i=0; i<$scope.studentsActList.length; i++){
          studentsIDList.push($scope.studentsActList[i].id);
        }

        // create a new note

        var tempStr = "";

        if(checkbox1 == true || checkbox2 == true){
          if(checkbox1 == true){
            tempStr = 'detail:Potty accident';
          }
          if(checkbox2 == true && checkbox1 == true){
            tempStr = tempStr.concat(',detail:Injury');
          }
          else if(checkbox2 == true && checkbox1 == false){
            tempStr = 'detail:Injury';
          }
        }

        //console.log(tempStr);

            Notes.note.post($.param({
              'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
              'type' : 'Incident',
              'Children' : studentsIDList.join(','),
              'user_id' : localStorageService.get('userId'),
              'from' : $filter('date')(new Date(), 'HH:mm:ss'),
              'to' : $filter('date')(new Date(), 'HH:mm:ss'),              
              'payload' : report_detail,
              'props' : tempStr

            }),function(data){
              console.log(data);
              alert("adding Incident report successfully!");

              $scope.reportID = data.id;
              console.log($scope.reportID);

              console.log("Incident report added!!!!!!!!!!!!!!!!!!!!!!!");

            },function(err){
              console.log(err)
            })

      }else{
        alert("sorry, you need to add at least one child.");
      }     
    }

    $scope.addNotes_bottle = function(from, oz, condition_food){
      if(!oz){
        alert("invalid portion inout!");
      }else{
        if($scope.studentsActList.length!=0){
            var studentsIDList = [];

            for(var i=0; i<$scope.studentsActList.length; i++){
              studentsIDList.push($scope.studentsActList[i].id);
            }

            // create a new note
                var tempStr = 'portion:'.concat(oz,',bottletype:', condition_food);

                Notes.note.post($.param({
                  'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
                  'type' : 'Bottle',
                  'Children' : studentsIDList.join(','),
                  'user_id' : localStorageService.get('userId'),
                  'from' : $filter('date')(from, 'HH:mm:ss'),
                  'to' : $filter('date')(from, 'HH:mm:ss'),
                  'props' : tempStr

                }),function(data){
                  console.log(data);
                  alert("adding bottle report successfully!");

                  $scope.reportID = data.id;
                  console.log($scope.reportID);


                  console.log("bottle report added!!!!!!!!!!!!!!!!!!!!!!!");

                },function(err){
                  console.log(err)
                })

          }else{
            alert("sorry, you need to add at least one child.");
          } 
      }
    }

    $scope.addNotes_meal = function (report_detail, from, condition_meal){
    if($scope.studentsActList.length!=0){
        var studentsIDList = [];

        for(var i=0; i<$scope.studentsActList.length; i++){
          studentsIDList.push($scope.studentsActList[i].id);
        }


        var tempStr = 'portion:'.concat(condition_meal);
        // create a new note
            Notes.note.post($.param({
              'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
              'type' : 'Meal',
              'Children' : studentsIDList.join(','),
              'user_id' : localStorageService.get('userId'),
              'payload' : report_detail,
              'from' : $filter('date')(from, 'HH:mm:ss'),
              'to' : $filter('date')(from, 'HH:mm:ss'),
              'props' : tempStr
            }),function(data){
              console.log(data);
              alert("adding meal report successfully!");

              $scope.reportID = data.id;
              console.log($scope.reportID);


              console.log("report meal added!!!!!!!!!!!!!!!!!!!!!!!");

            },function(err){
              console.log(err)
            })

      }else{
        alert("sorry, you need to add at least one child.");
      }   
    }

    $scope.addNotes_reminder = function (report_detail, wipe,clothing, sunscreen, diaper){

    if($scope.studentsActList.length!=0){
        var studentsIDList = [];

        for(var i=0; i<$scope.studentsActList.length; i++){
          studentsIDList.push($scope.studentsActList[i].id);
        }

         var tempStr = "";

         if(wipe==true || clothing==true || sunscreen==true || diaper==true){
            if(wipe){
              tempStr = 'bring:wipe';
            }
            if(clothing){
              if(tempStr == ""){
                tempStr = 'bring:clothing';
              }else{
                tempStr = tempStr.concat(",bring:clothing");
              }
            }
            if(sunscreen){
              if(tempStr == ""){
                tempStr = 'bring:sunscreen';
              }else{
                tempStr = tempStr.concat(",bring:sunscreen");
              }
            }
            if(diaper){
              if(tempStr == ""){
                tempStr = 'bring:diaper';
              }else{
                tempStr = tempStr.concat(",bring:diaper");
              }
            }
         }else{
          tempStr = null;
         }


        // create a new note
            Notes.note.post($.param({
              'createTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
              'type' : 'Reminder',
              'Children' : studentsIDList.join(','),
              'user_id' : localStorageService.get('userId'),
              'payload' : report_detail,
              'from' : $filter('date')(new Date(), 'HH:mm:ss'),
              'to' : $filter('date')(new Date(), 'HH:mm:ss'),
              'props' : tempStr
            }),function(data){
              console.log(data);
              alert("adding Reminder report successfully!");

              $scope.reportID = data.id;
              console.log($scope.reportID);


              console.log("report Reminder added!!!!!!!!!!!!!!!!!!!!!!!");

            },function(err){
              console.log(err)
            })

      }else{
        alert("sorry, you need to add at least one child.");
      }  
    }
  }


    //===================== new note ends here ===========================  
]);