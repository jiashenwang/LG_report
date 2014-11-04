'use strict';

(function() {
	// Enrollments Controller Spec
	describe('Enrollments Controller Tests', function() {
		// Initialize global variables
		var EnrollmentsController,
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

			// Initialize the Enrollments controller.
			EnrollmentsController = $controller('EnrollmentsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Enrollment object fetched from XHR', inject(function(Enrollments) {
			// Create sample Enrollment using the Enrollments service
			var sampleEnrollment = new Enrollments({
				name: 'New Enrollment'
			});

			// Create a sample Enrollments array that includes the new Enrollment
			var sampleEnrollments = [sampleEnrollment];

			// Set GET response
			$httpBackend.expectGET('enrollments').respond(sampleEnrollments);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.enrollments).toEqualData(sampleEnrollments);
		}));

		it('$scope.findOne() should create an array with one Enrollment object fetched from XHR using a enrollmentId URL parameter', inject(function(Enrollments) {
			// Define a sample Enrollment object
			var sampleEnrollment = new Enrollments({
				name: 'New Enrollment'
			});

			// Set the URL parameter
			$stateParams.enrollmentId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/enrollments\/([0-9a-fA-F]{24})$/).respond(sampleEnrollment);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.enrollment).toEqualData(sampleEnrollment);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Enrollments) {
			// Create a sample Enrollment object
			var sampleEnrollmentPostData = new Enrollments({
				name: 'New Enrollment'
			});

			// Create a sample Enrollment response
			var sampleEnrollmentResponse = new Enrollments({
				_id: '525cf20451979dea2c000001',
				name: 'New Enrollment'
			});

			// Fixture mock form input values
			scope.name = 'New Enrollment';

			// Set POST response
			$httpBackend.expectPOST('enrollments', sampleEnrollmentPostData).respond(sampleEnrollmentResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Enrollment was created
			expect($location.path()).toBe('/enrollments/' + sampleEnrollmentResponse._id);
		}));

		it('$scope.update() should update a valid Enrollment', inject(function(Enrollments) {
			// Define a sample Enrollment put data
			var sampleEnrollmentPutData = new Enrollments({
				_id: '525cf20451979dea2c000001',
				name: 'New Enrollment'
			});

			// Mock Enrollment in scope
			scope.enrollment = sampleEnrollmentPutData;

			// Set PUT response
			$httpBackend.expectPUT(/enrollments\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/enrollments/' + sampleEnrollmentPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid enrollmentId and remove the Enrollment from the scope', inject(function(Enrollments) {
			// Create new Enrollment object
			var sampleEnrollment = new Enrollments({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Enrollments array and include the Enrollment
			scope.enrollments = [sampleEnrollment];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/enrollments\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEnrollment);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.enrollments.length).toBe(0);
		}));
	});
}());