'use strict';

(function() {
	// Invitations Controller Spec
	describe('Invitations Controller Tests', function() {
		// Initialize global variables
		var InvitationsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Invitations controller.
			InvitationsController = $controller('InvitationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Invitation object fetched from XHR', inject(function(Invitations) {
			// Create sample Invitation using the Invitations service
			var sampleInvitation = new Invitations({
				name: 'New Invitation'
			});

			// Create a sample Invitations array that includes the new Invitation
			var sampleInvitations = [sampleInvitation];

			// Set GET response
			$httpBackend.expectGET('invitations').respond(sampleInvitations);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.invitations).toEqualData(sampleInvitations);
		}));

		it('$scope.findOne() should create an array with one Invitation object fetched from XHR using a invitationId URL parameter', inject(function(Invitations) {
			// Define a sample Invitation object
			var sampleInvitation = new Invitations({
				name: 'New Invitation'
			});

			// Set the URL parameter
			$stateParams.invitationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/invitations\/([0-9a-fA-F]{24})$/).respond(sampleInvitation);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.invitation).toEqualData(sampleInvitation);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Invitations) {
			// Create a sample Invitation object
			var sampleInvitationPostData = new Invitations({
				name: 'New Invitation'
			});

			// Create a sample Invitation response
			var sampleInvitationResponse = new Invitations({
				_id: '525cf20451979dea2c000001',
				name: 'New Invitation'
			});

			// Fixture mock form input values
			scope.name = 'New Invitation';

			// Set POST response
			$httpBackend.expectPOST('invitations', sampleInvitationPostData).respond(sampleInvitationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Invitation was created
			expect($location.path()).toBe('/invitations/' + sampleInvitationResponse._id);
		}));

		it('$scope.update() should update a valid Invitation', inject(function(Invitations) {
			// Define a sample Invitation put data
			var sampleInvitationPutData = new Invitations({
				_id: '525cf20451979dea2c000001',
				name: 'New Invitation'
			});

			// Mock Invitation in scope
			scope.invitation = sampleInvitationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/invitations\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/invitations/' + sampleInvitationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid invitationId and remove the Invitation from the scope', inject(function(Invitations) {
			// Create new Invitation object
			var sampleInvitation = new Invitations({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Invitations array and include the Invitation
			scope.invitations = [sampleInvitation];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/invitations\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleInvitation);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.invitations.length).toBe(0);
		}));
	});
}());