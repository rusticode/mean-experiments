var app = angular.module("angularApp07", ["ui.router", "ngResource"]);

app.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/homepage");

    $stateProvider
        .state('homepage', {
            url: "/homepage",
            templateUrl: "partials/homePartial.html",
            controller: 'HomePageController'
        })
        .state('page', {
            abstract: false,
            url: "/page",
            templateUrl: "partials/pagePartial.html",
            controller: 'PageController'
        })
        .state('page.id', {
            url: "/{id:[0-9]{1,2}}",
            controller: 'PageIdController'
        })
        .state('page.list', {
            url: "/list",
            templateUrl: "partials/listPartial.html",
            controller: 'ListController'
        })
        .state('page.resolved-list', {
            url: "/resolved-list",
            templateUrl: "partials/listPartial.html",
            resolve: {
                items : function (ItemProxy) {
                    ItemProxy.getItems();
                }
            },
            controller: 'ListController'
        })
});

app.controller("HomePageController", function($scope) {
    $scope.page = {
        title: "Application Homepage Title",
        content: "Special customized content for the homepage goes here :)"
    }
});

app.controller("PageController", function($scope, $stateParams) {
    $scope.page = {
        title : "set 'abstract' to 'true' in angularApp07.js to prevent this page from loading"
    };
});

app.controller("PageIdController", function($scope, $stateParams) {
    $scope.page.title = "Application Page Title ( page : " + $stateParams.id + " )";
    $scope.page.content = "PageIdConteoller updated page.content object available for parent controller. YAY!"
});

app.controller("ListController", function($scope, ItemProxy) {
    $scope.page.title = "Application List Title";
    $scope.page.content = "Here is the list"
    $scope.items = ItemProxy.getItems();
});

app.factory("ItemProxy", function ($resource) {
    var Items = $resource('data/ang-07-data.json');
    return {
        getItems : function () {
            return Items.query();
        }
    };
});
