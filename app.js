var firebaseapp = angular.module('firebaseapp', ['ngRoute', 'firebase']);

firebaseapp.run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if (error == 'AUTH_REQUIRED') {
      $rootScope.message = 'Sorry, you must be a registered user.'
      $location.path('/register');
    }
  })
}]);


firebaseapp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/register', {
    templateUrl: 'views/register.html',
    controller: 'LoginController'
  }).
  when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  }).
  when('/success', {
    templateUrl: 'views/init.html',
    controller: 'InitController',
    resolve: {
      'currentAuth': ['Auth', function(Auth) {
        return Auth.$requireSignIn();
      }]
    }
  }).
  when('/reset', {
    templateUrl: 'views/reset.html',
    controller: 'LoginController'
  }).
  when('/account', {
    templateUrl: 'views/account.html',
    controller: 'LoginController' // Use the getUser method from the AuthenticationListener service to get the user information from the firebase db AuthenticationListener.evento(firebaseUser);
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);


firebaseapp.factory('Auth', ['$firebaseAuth',
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);