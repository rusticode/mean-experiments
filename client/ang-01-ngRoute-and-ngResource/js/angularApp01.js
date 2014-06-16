var angularApp01 = angular.module("angularApp01", ["ngRoute"]);

angularApp01.config(function($routeProvider) {
    $routeProvider.
        when('/homepage', {
            templateUrl: 'partials/homePartial.html',
            controller: 'homepageController'
        }).
        when('/page/:id', {
            templateUrl: 'partials/pagePartial.html',
            controller: 'pageController'
        }).
        otherwise({
            redirectTo: '/homepage'
        });
})

angularApp01.controller("homepageController", function($scope) {
    $scope.title = "Application Homepage Title";
});

angularApp01.controller("pageController", function($scope, $routeParams) {
    $scope.title = "Application Page Title ( page : " + $routeParams.id + " )";
});