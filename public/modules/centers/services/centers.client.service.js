'use strict';

//Centers service used to communicate Centers REST endpoints
angular.module('centers').factory('Centers', ['$resource','API',
	function($resource,API) {
		return {

			centers : $resource('http://54.191.199.150/api/centers', null, {
				get: { method: 'GET', isArray: true},
				post : {method : 'POST'}
			})

		}
	}
]);
