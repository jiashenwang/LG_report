'use strict';

//Setting up route
angular.module('invitations').config(['$stateProvider',
	function($stateProvider) {
		// Invitations state routing
		$stateProvider.
		state('listInvitations', {
			url: '/invitations',
			templateUrl: 'modules/invitations/views/list-invitations.client.view.html'
		}).
		state('createInvitation', {
			url: '/invitations/create',
			templateUrl: 'modules/invitations/views/create-invitation.client.view.html'
		}).
		state('viewInvitation', {
			url: '/invitations/:invitationId',
			templateUrl: 'modules/invitations/views/view-invitation.client.view.html'
		}).
		state('editInvitation', {
			url: '/invitations/:invitationId/edit',
			templateUrl: 'modules/invitations/views/edit-invitation.client.view.html'
		});
	}
]);