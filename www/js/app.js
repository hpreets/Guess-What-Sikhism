angular.module('guesswhat', ['ionic', 'guesswhat.controllers', 'guesswhat.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {


  });

})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('home', {
    url: "/app/home",
    templateUrl: "templates/home.html",
    controller: 'HomeCtrl'
  })
  .state('landing', {
    url: "/app/landing",
    templateUrl: "templates/landing.html",
    controller: 'LandingCtrl'
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/landing');
});
