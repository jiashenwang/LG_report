'use strict';

//Domains service used to communicate Domains REST endpoints
angular.module('domains').factory('Domains', ['$resource',
	function($resource) {
		return $resource('domains/:domainId', { domainId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);