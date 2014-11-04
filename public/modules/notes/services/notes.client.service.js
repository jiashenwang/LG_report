'use strict';

//Notes service used to communicate Notes REST endpoints
angular.module('notes').factory('Notes', ['$resource','API',
	function($resource,API) {
		return {

			note : $resource(API.note.get,{}, {
				get: { method: 'GET',isArray : true, headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				post: { method: 'POST',isArray : false, headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				update: { method: 'PUT',isArray : false, headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				delete: { method: 'DELETE',isArray : false, headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				groupId: { method: 'GET',isArray : true, headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				enrollmentId: { method: 'GET',isArray : true, headers: {'Content-Type': 'application/x-www-form-urlencoded'}},

			}),

			noteSpecial : $resource(API.note.get+'/:id',{id:'@noteId'},{
				get: { method: 'GET',isArray : false, headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				delete: { method: 'DELETE',isArray : false, headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				update: { method: 'PUT',isArray : false, headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			})


		}
	}
]);

//
