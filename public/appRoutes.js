angular
    .module('appRoutes', ["ui.router"])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
                function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state({
        name: 'home',
        url: '/',
        templateUrl: 'public/components/MyApp/templates/homepage.html',
        controller: 'homeController'
    }).state({
        name: 'question',
        url: '/question',
        templateUrl: 'public/components/MyApp/templates/questions.html',
        controller: 'homeController'
    }).state({
        name: 'result',
        url: '/result',
        templateUrl: 'public/components/MyApp/templates/result.html',
        controller: 'homeController'
    });

    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);
}])
.run(function($rootScope, $location, $http) {
    "use strict";
    $rootScope.navigate = function() {
        var args = Array.prototype.slice.call(arguments);
        var url = args.join('/');
        $location.url(url);
    };
});