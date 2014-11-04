'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource','API',
	function($resource,API) {
		return {

			login : $resource(API.user.login,{}, {
				post: { method: 'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),

			owner : $resource(API.user.register.owner,{}, {
				post: { method: 'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),

			collaborator : $resource(API.user.register.collaborator,{}, {
				post: { method: 'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),

			parent : $resource(API.user.register.parent,{}, {
				post: { method: 'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),


			account : $resource(API.user.profile.update,{}, {
				update: { method: 'PUT',headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),

			password : $resource(API.user.profile.updatePassword,{}, {
				update: { method: 'PATCH',headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),



		}
	}
]);
