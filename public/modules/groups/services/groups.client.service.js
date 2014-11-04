'use strict';

//Groups service used to communicate Groups REST endpoints
angular.module('groups').factory('Groups', ['$resource','API',
	function($resource,API) {
		return {

			centerId : $resource(API.group.centerId,{}, {
				get: { method: 'GET',isArray:true},
			}),

			groupId : $resource(API.group.groupId,{}, {
				get: { method: 'GET',isArray:false},
			}),

			stages : $resource(API.group.stages,{}, {
				get: { method: 'GET',isArray:true},
			}),

			group : $resource(API.group.create,{}, {
				create: { method: 'POST',isArray:false,headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),

			groupEdit : $resource(API.group.update+':id',{id:'@id'}, {
				// update: { method: 'PUT',isArray:false,headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				update: { method: 'PUT',isArray:false,headers: {'Content-Type': 'application/json'}},
				delete: { method: 'DELETE',isArray:false,headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),

			domains : $resource(API.group.domains,{}, {
				get: { method: 'GET',isArray:true},
			}),

			invitation : $resource(API.group.invitation.generate,null, {
				generate: { method: 'POST',isArray:false,headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
				group: { method: 'PUT',isArray:false,headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),

			invitationSend : $resource(API.group.invitation.send,null, {
				send: { method: 'POST',isArray:false,headers: {'Content-Type': 'application/x-www-form-urlencoded'}},
			}),



		}
	}
]);
