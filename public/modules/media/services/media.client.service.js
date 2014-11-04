'use strict';

//Media service used to communicate Media REST endpoints
angular.module('media').factory('Media', ['$resource','API',
	function($resource,API) {
		return {

			media : $resource(API.media,{}, {
				post: { method: 'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),
		}
	}
]);
