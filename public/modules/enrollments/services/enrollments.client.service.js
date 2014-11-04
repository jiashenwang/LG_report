'use strict';

//Enrollments service used to communicate Enrollments REST endpoints
angular.module('enrollments').factory('Enrollments', ['$resource','API',
	function($resource,API) {
		return {

			enrollment : $resource(API.enrollment.create,{}, {
				create: { method: 'POST',isArray:false,headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				update: { method: 'UPDATE',isArray:false,headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				delete: { method: 'DELETE',isArray:false,headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),


		}
	}
]);
