'use strict';

(function() {
	// Domains Controller Spec
	describe('Domains Controller Tests', function() {
		// Initialize global variables
		var DomainsController,
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

			// Initialize the Domains controller.
			DomainsController = $controller('DomainsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Domain object fetched from XHR', inject(function(Domains) {
			// Create sample Domain using the Domains service
			var sampleDomain = new Domains({
				name: 'New Domain'
			});

			// Create a sample Domains array that includes the new Domain
			var sampleDomains = [sampleDomain];

			// Set GET response
			$httpBackend.expectGET('domains').respond(sampleDomains);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.domains).toEqualData(sampleDomains);
		}));

		it('$scope.findOne() should create an array with one Domain object fetched from XHR using a domainId URL parameter', inject(function(Domains) {
			// Define a sample Domain object
			var sampleDomain = new Domains({
				name: 'New Domain'
			});

			// Set the URL parameter
			$stateParams.domainId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/domains\/([0-9a-fA-F]{24})$/).respond(sampleDomain);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.domain).toEqualData(sampleDomain);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Domains) {
			// Create a sample Domain object
			var sampleDomainPostData = new Domains({
				name: 'New Domain'
			});

			// Create a sample Domain response
			var sampleDomainResponse = new Domains({
				_id: '525cf20451979dea2c000001',
				name: 'New Domain'
			});

			// Fixture mock form input values
			scope.name = 'New Domain';

			// Set POST response
			$httpBackend.expectPOST('domains', sampleDomainPostData).respond(sampleDomainResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Domain was created
			expect($location.path()).toBe('/domains/' + sampleDomainResponse._id);
		}));

		it('$scope.update() should update a valid Domain', inject(function(Domains) {
			// Define a sample Domain put data
			var sampleDomainPutData = new Domains({
				_id: '525cf20451979dea2c000001',
				name: 'New Domain'
			});

			// Mock Domain in scope
			scope.domain = sampleDomainPutData;

			// Set PUT response
			$httpBackend.expectPUT(/domains\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/domains/' + sampleDomainPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid domainId and remove the Domain from the scope', inject(function(Domains) {
			// Create new Domain object
			var sampleDomain = new Domains({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Domains array and include the Domain
			scope.domains = [sampleDomain];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/domains\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleDomain);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.domains.length).toBe(0);
		}));
	});
}());