describe('AuthenticationController', function() {

  var AuthenticationController;
  var scope;
  var $httpBackend;
  var $stateParams;
  var $location;


  // Load the main application module
  beforeEach(module(ApplicationConfiguration.applicationModuleName));


  beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
    // Set a new global scope
    scope = $rootScope.$new();

    // Point global variables to injected services
    $stateParams = _$stateParams_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;

    // Initialize the Authentication controller
    AuthenticationController = $controller('AuthenticationController', {
      $scope: scope
    });

    

    //
    // it('$scope.signin() should login with a correct user and password', function() {
    //   // Test expected GET request
    //   $httpBackend.when('POST', '/auth/signin').respond(200, 'Fred');
    //
    //   scope.signin();
    //   $httpBackend.flush();
    //
    //   // Test scope value
    //   expect(scope.authentication.user).toEqual('Fred');
    //   expect($location.url()).toEqual('/');
    // });


  }));



})
