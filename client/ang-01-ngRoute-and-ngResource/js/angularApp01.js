var angularApp01 = angular.module("angularApp02", ["ngRoute", "ngResource"]);

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
        when('/resolved-list', {
            templateUrl: 'partials/listPartial.html',
            controller: 'listController',
            resolve: {
                items : function(ItemProxy) {
                    ItemProxy.getItems();
                }
            }
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

angularApp01.controller("listController", function($scope, ItemProxy) {
    $scope.title = "Application List Title";
    $scope.items = ItemProxy.getItems();
});

angularApp01.factory("ItemProxy", function ($resource) {
    var Items = $resource('data/ang-01-data.json');
    return {
        getItems : function () {
            return Items.query();
        }
    };
});
