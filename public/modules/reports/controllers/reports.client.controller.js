'use strict';

// Reports controller
angular.module('reports').controller('ReportsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reports','Centers','localStorageService','Groups','Notes','$filter','ngDialog',
	function($scope, $stateParams, $location, Authentication, Reports, Centers,localStorageService,Groups,Notes,$filter,ngDialog ) {

		// Create new Report
		$scope.authentication = Authentication;
		$scope.groups = [];
		$scope.studentsList = [];
		$scope.currentGroupTitle = "Please Select a Group";
		$scope.currentStudetnId = null;
		$scope.groupReady = false;
		$scope.reportsReady = true;
		$scope.portfoliosDetail = [];
		$scope.currentStudentName = "";
		$scope.reports = [];

		$scope.protfolioFilterStartDate = new Date();
		$scope.protfolioFilterStartDate.setDate($scope.protfolioFilterStartDate.getDate() - 1);
		$scope.protfolioFilterEndDate = new Date();
		$scope.protfolioFilterEndDate.setDate($scope.protfolioFilterEndDate.getDate() + 1);		



		$scope.init = function () {
			$scope.getGroups();
		}

		$scope.getGroups = function(){
			localStorageService.set( 'userId','baf012aa-af2c-e411-830c-06f5067f5b34');
			Centers.centers.get({
				'owner_id' : localStorageService.get('userId')
			},function(data){
				$scope.groupReady = true;
				console.log(data)
				$scope.centers = data;

				for(var i = 0;i<data.length;i++){

					for(var j = 0;j<data[i].groups.length;j++){
						$scope.groups.push(data[i].groups[j])
					}
				}


			},function(err){
				console.log(err);
				alert('服务器没有返回 获取Center 和 Group 信息出错!')
			});
		}


		$scope.updateStudents = function(groups_id){
			//$cookieStore.put('choosen_group_id', groups_id);
			localStorageService.set('groupID', groups_id)
			console.log(groups_id);

			Groups.groupId.get({
				'id' : groups_id
			},function(data){
				console.log(data);
				$scope.studentsList = data.enrollments
				console.log($scope.studentsList);
				// Update Group Select Btn title so that it shows the name of current group
				$scope.currentGroupTitle = data.name

			},function(err){
				console.log(err);
			})
		}		

		$scope.filter = function(){
			if($scope.currentStudetnId){
				$scope.showReports($scope.currentStudetnId, $scope.currentStudentName);
			}else{
				alert("Sorry, you need to choose one child first!");
			}
		}
		$scope.showReports = function(enrollment_id,name){
			$scope.reports = [];
			$scope.reportsReady = false;
			$scope.currentStudetnId = enrollment_id;
			$scope.currentStudentName = name;

			if($scope.checkDate()){
				Notes.note.get({
					'enrollment_id' : enrollment_id,
					'before_time' : $filter('date')($scope.protfolioFilterEndDate, 'yyyy-MM-dd'),
					'count' : 100,
					'note_category' : 'report',
				},function(data){
					//console.log(data)
					$scope.reportsReady = true;
					$scope.reports = [];
					for(var i=0; i<data.length; i++){
						if((new Date(data[i].create_at)) >= $scope.protfolioFilterStartDate){
							$scope.reports.push(data[i]);
						}
					}
					console.log($scope.reports);
				},function(err){
					console.log(err)
				})
			}else{
				alert("Invild Date Picked!");
			}

		}	

		// add new report
		$scope.addReport = function(){
			if($scope.studentsList.length>0){
				ngDialog.open({
					template: '/modules/reports/views/dialogs/add-report.client.view.html',
					className: 'ngdialog-theme-default',
					controller : 'ReportsAddController',
					data : {
						studentsList : $scope.studentsList,
						addFlag : true
					},
					scope :$scope
				});
			}else{
				alert("Please select one group!")
			}
		}	

		// for date picker
		$scope.openStartDatePopup = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();
		    $scope.startDatePopupOpened = true;
		 };
		$scope.openEndDatePopup = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.endDatePopupOpened = true;
		};	

// remove reports starts here +++++++++++++++++++++++++++++++++++++++++++++++++++++++
	  $scope.delete_report = function(report_id){
	  	

	  	Notes.noteSpecial.get({},{
	        noteId : report_id
	    },function(data){
	    	console.log(data);
	    	

	        if(data.children.length <= 1){
		       	Notes.noteSpecial.delete({},{
			        noteId : report_id
			    },function(data){

			        console.log("remove report successfully!");
	        	for (var i =0; i<$scope.reports.length; i++){
	        		if($scope.reports[i].id_str == report_id){
	        			$scope.reports.splice(i, 1);
	        		}
	        	}		        
			    },function(err){
			    	console.log(err)
			    })  
	        }
	        else{
	        	var temp_children = data.children;
	        	for(var i = 0; i<data.children.length; i++){
	        		if(temp_children[i].id_str == $scope.enrollmentID){
	        			temp_children.splice(i, 1);
	        		}
	        	}

	        	
	        	var props_string = "";
	        	for (var i=0; i<data.props.length; i++){
	        		if(props_string == ""){
	        			props_string = data.props[i].meta_key + ":" + data.props[i].meta_value;
	        		}else{
	        			props_string = props_string+","+data.props[i].meta_key + ":" + data.props[i].meta_value;
	        		}
	        	}

	        	//============

		    	var studentsIDList = [];

		        var student_list = temp_children;
		        // convert to id list
		        for(var i=0; i<student_list.length; i++){
		        	if(student_list[i].id_str){
		            	studentsIDList.push(student_list[i].id_str);
		            }else{
		                studentsIDList.push(student_list[i].id);
		            }
		        }        	

		        var mediaID_list="";
		        for(var i=0; i<data.media.length; i++){
		        	if(mediaID_list == ""){
		        		mediaID_list = data.media[i].id;
		        	}else{
		        		mediaID_list = mediaID_list + "," +data.media[i].id;
		        	}
		        }



		 		Notes.noteSpecial.update($.param({
		            //'title' : data.title,
		            'updateTime' : $filter('date')(new Date(), 'MM-dd-yyyy'),
		            'type' : data.type,
		            'Children' : studentsIDList.join(','),
		           	'user_id' : localStorageService.get('userId'),
		           	'payload' : data.payload,
		           	'from' : $filter('date')(data.from_date, 'MM-dd-yyyy'),
		            'to' : $filter('date')(data.to_date, 'MM-dd-yyyy'),
		            'medias' : mediaID_list,
		            'props' : props_string,
		            'isCopyToActivity' : data.isCopyToActivity

		        },{noteId : report_id})
		 		,function(value){
		        	alert("Note update successfully!");
		        	for (var i =0; i<$scope.reports.length; i++){
		        		if($scope.reports[i].id_str == report_id){
		        			$scope.reports.splice(i, 1);
		        		}
		        	}		        	
		        },function(err){
		            console.log(err)
		        })       	
	        	//============

	        	
	        } 
	    },function(err){
	        console.log(err)
	    }) 
	  }
// remove reports ends here +++++++++++++++++++++++++++++++++++++++++++++++++++++++++


		$scope.edit_report = function(report_id){
			localStorageService.set( 'reportID',report_id);
			ngDialog.open({
				template: '/modules/reports/views/dialogs/edit-report.client.view.html',
				className: 'ngdialog-theme-default',
				data : {
						studentsList : $scope.studentsList,
						addFlag : true
					},
					scope :$scope
			});	
		}


		$scope.checkDate = function(){
			return ($scope.protfolioFilterStartDate < $scope.protfolioFilterEndDate);
		}	

		// check reports' types
		$scope.isActivity = function(type){
			return (type == "Activity");
		}
		$scope.isNap = function(type){
			return (type == "Nap");
		}
		$scope.isPotty = function(type){
			return (type == "Potty");
		}
		$scope.isDiaper = function(type){
			return (type == "Diapper");
		}
		$scope.isMeal = function(type){
			return (type == "Meal");
		}
		$scope.isBottle = function(type){
			return (type == "Bottle");
		}
		$scope.isMood = function(type){
			return (type == "Mood");
		}
		$scope.isReminder = function(type){
			return (type == "Reminder");
		}
		$scope.isSong = function(type){
			return (type == "Song");
		}
		$scope.isReading = function(type){
			return (type == "Reading");
		}
		$scope.isIncident = function(type){
			return (type == "Incident");
		}
		$scope.isOther = function(type){
			return (type == "Other");
		}		



		// initialize report page by getting groups
		$scope.init();

	}
]);