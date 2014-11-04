'use strict';

//Homes service used to communicate Homes REST endpoints
angular.module('homes').factory('Homes', ['$resource',
	function($resource) {
		return $resource('homes/:homeId', { homeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);