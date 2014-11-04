'use strict';

//Invitations service used to communicate Invitations REST endpoints
angular.module('invitations').factory('Invitations', ['$resource','API',
	function($resource,API) {
		return {
			group : $resource(API.invitation.delete,{}, {
				delete: { method: 'DELETE',headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),
		}
	}
]);
