// reference: https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views

var app = angular.module("angularApp07", ["ui.router", "ngResource"]);

app.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/homepage");

    $stateProvider
        .state('homepage', {
            url: "/homepage",
            views: {
                "" : {
                    templateUrl: "partials/homePartial.html",
                    controller: 'HomePageController'
                },
                "info": {
                    templateUrl: "partials/homePageInfoPartial.html"
                }
            }
        })
        .state('page', {
            abstract: false,
            url: "/page",
            views: {
                // Relatively targets the unnamed view in this state's parent (root) unnamed state'.
                "": {
                    templateUrl: "partials/pagePartial.html",
                    controller: 'PageController'
                },
                // relatively targets the 'info' view in this state's parent (root) unnamed state'.
                "info": {
                    template: "set 'abstract' to 'true' in angularApp08.js to prevent this page from loading"
                }
            }
        })
        .state('page.id', {
            url: "/{id:[0-9]{1,2}}",
            controller: 'PageIdController',
            views: {
                // absolutely targets the 'info' view in this state's root unnamed state'.
                "info@" : {
                    template: "page.content model object created in PageController can be updated "
                     + "from it's child PageIdConteoller updated. YAY!"
                }
            }
        })
        .state('page.list', {
            url: "/list",
            templateUrl: "partials/listPartial.html",
            controller: 'ListController'
        })
        .state('page.resolved-list', {
            url: "/resolved-list",
            views: {
                "" : {
                    templateUrl: "partials/listPartial.html",
                    resolve: {
                        items : function (ItemProxy) {
                            ItemProxy.getItems();
                        }
                    },
                    controller: 'ListController',
                    // absolutely targets the 'info' view in this state's root unnamed state'.
                    "info@" : {
                        template: "page.content model object created in PageController can be updated "
                            + "from it's child PageIdConteoller updated. YAY!"
                    }
                }
            }
        });
});

app.controller("HomePageController", function($scope) {
    $scope.page = {
        title: "Application Homepage Title",
        content: "Special customized content for the homepage goes here :)"
    }
});

app.controller("PageController", function($scope, $stateParams) {
    $scope.page = {
        title : "Page Controller parent page"
    };
});

app.controller("PageIdController", function($scope, $stateParams) {
    $scope.page.title = "Application Page Title ( page : " + $stateParams.id + " )";
    $scope.page.content = "";
});

app.controller("ListController", function($scope, ItemProxy) {
    $scope.page.title = "Application List Title";
    $scope.page.content = "Here is the list";
    $scope.items = ItemProxy.getItems();
});

app.factory("ItemProxy", function ($resource) {
    var Items = $resource('data/ang-08-data.json');
    return {
        getItems : function () {
            return Items.query();
        }
    };
});
