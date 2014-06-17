var angularApp01 = angular.module("angularApp01", ["ngRoute", "ngResource"]);

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
        when('/list', {
            templateUrl: 'partials/listPartial.html',
            controller: 'listController'
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

angularApp01.controller("listController", function ListController($scope, $routeParams, $resource) {
    $scope.title = "Application List Title ( page : " + $routeParams.id + " )";

    var Items = $resource('data/ang-01-data.json');
    $scope.items = Items.query(function() {
        console.log($scope.items);
    });
});
