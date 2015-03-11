// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
AV.initialize('wjngspg86tk061ckslkvw5osfz8b2x21mysmqba7f5dsd27p', 'svfgq5camdvd7fzebf3bwswtwd3hqglfhf4y5v7rgmz3evta');
angular.module('YiSample', ['ionic', 'YiIonicListView'])
  .config(function($stateProvider, $urlRouterProvider, $compileProvider) {
    $stateProvider
      .state('tabs', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })
      .state('tabs.sample', {
        url: "/sample",
        views: {
          'sample-tab': {
            controller: 'yiIonicListViewCtrl',
            templateUrl: "templates/sample.html"
          }
        }
      });
    $urlRouterProvider.otherwise("/tab/sample");
  })

.run(function($rootScope, $ionicPlatform) {
    $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
});
