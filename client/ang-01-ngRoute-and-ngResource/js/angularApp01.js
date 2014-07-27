var angularApp01 = angular.module("angularApp01", ["ngRoute", "ngResource"]);

angularApp01.config(function($routeProvider) {
    $routeProvider.
        when('/homepage', {
            templateUrl: 'partials/homePartial.html',
            controller: 'HomePageController'
        }).
        when('/page/:id', {
            templateUrl: 'partials/pagePartial.html',
            controller: 'PageController'
        }).
        when('/list', {
            templateUrl: 'partials/listPartial.html',
            controller: 'ListController'
        }).
        when('/resolved-list', {
            templateUrl: 'partials/listPartial.html',
            controller: 'ListController',
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

angularApp01.controller("HomePageController", function($scope) {
    $scope.title = "Application Homepage Title";
});

angularApp01.controller("PageController", function($scope, $routeParams) {
    $scope.title = "Application Page Title ( page : " + $routeParams.id + " )";
});

angularApp01.controller("ListController", function($scope, ItemProxy) {
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
