'use strict';

(function() {
	// Homes Controller Spec
	describe('Homes Controller Tests', function() {
		// Initialize global variables
		var HomesController,
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

			// Initialize the Homes controller.
			HomesController = $controller('HomesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Home object fetched from XHR', inject(function(Homes) {
			// Create sample Home using the Homes service
			var sampleHome = new Homes({
				name: 'New Home'
			});

			// Create a sample Homes array that includes the new Home
			var sampleHomes = [sampleHome];

			// Set GET response
			$httpBackend.expectGET('homes').respond(sampleHomes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.homes).toEqualData(sampleHomes);
		}));

		it('$scope.findOne() should create an array with one Home object fetched from XHR using a homeId URL parameter', inject(function(Homes) {
			// Define a sample Home object
			var sampleHome = new Homes({
				name: 'New Home'
			});

			// Set the URL parameter
			$stateParams.homeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/homes\/([0-9a-fA-F]{24})$/).respond(sampleHome);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.home).toEqualData(sampleHome);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Homes) {
			// Create a sample Home object
			var sampleHomePostData = new Homes({
				name: 'New Home'
			});

			// Create a sample Home response
			var sampleHomeResponse = new Homes({
				_id: '525cf20451979dea2c000001',
				name: 'New Home'
			});

			// Fixture mock form input values
			scope.name = 'New Home';

			// Set POST response
			$httpBackend.expectPOST('homes', sampleHomePostData).respond(sampleHomeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Home was created
			expect($location.path()).toBe('/homes/' + sampleHomeResponse._id);
		}));

		it('$scope.update() should update a valid Home', inject(function(Homes) {
			// Define a sample Home put data
			var sampleHomePutData = new Homes({
				_id: '525cf20451979dea2c000001',
				name: 'New Home'
			});

			// Mock Home in scope
			scope.home = sampleHomePutData;

			// Set PUT response
			$httpBackend.expectPUT(/homes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/homes/' + sampleHomePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid homeId and remove the Home from the scope', inject(function(Homes) {
			// Create new Home object
			var sampleHome = new Homes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Homes array and include the Home
			scope.homes = [sampleHome];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/homes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleHome);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.homes.length).toBe(0);
		}));
	});
}());