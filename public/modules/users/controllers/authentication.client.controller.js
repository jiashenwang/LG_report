'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication','Users','localStorageService',
	function($scope, $http, $location, Authentication,Users,localStorageService) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user){
			$location.path('/login');
		}

		$scope.login = {};



		$scope.login = function() {


			$scope.login.email = 'marting.gao@gmail.com';
			$scope.login.password = '123456';

			console.log('[LOG] Will Login')
			console.log($http.defaults.headers)
			Users.login.post($.param({
				email : $scope.login.email,
				password : $scope.login.password
			}),function(data){
				// Save User info to LocalStorage
				localStorageService.set( 'userId',data.user_id);
				localStorageService.set( 'email',data.primary_email);
				localStorageService.set('displayName', data.display_name);
				localStorageService.set('avatarUrl', data.avatar_url);

				$scope.authentication.user = data.user_id;
				console.log(data);
				alert('登录成功!');
				location.href = '#!/home'
			},function(err){
				console.log(err);
					switch (err.status){
						case 500:
							alert('用户名或密码输入错误!');
							break;
						// case 503:
						// 	alert('服务器端的跨域访问资源已被关闭!');
							break;
						case 400:
							alert('用户名或密码输入错误!');
							break;
						case 415:
							alert('HTTP Error 415 Unsupported media type!');
							break;
						case 0:
							alert('net::ERR_EMPTY_RESPONSE 跨域访问资源失败!');
							break;
						default:
							alert('其他错误 这里有Bug！');
							break;
					}
			})
		};

		$scope.registerCollaborator = function(){
			Users.collaborator.post($.param({
				invitation_token : $scope.register.token,
				display_name : $scope.register.name,
				email : $scope.register.email,
				password : $scope.register.password,
			}),function(collaborator){
				console.log(collaborator);
			},function(err){
				console.log(err);
				if(err.data.error_code == 20505){
					alert('Your Invitation Token is invalid!')
				}
				else{
					alert('Invalid Information!');
				}
			})
		}
	}
]);
