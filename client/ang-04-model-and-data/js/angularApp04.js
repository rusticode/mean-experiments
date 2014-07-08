angular.module("angularApp04", ['ngResource'])
    .controller("MainPageController", function($scope, ItemProxy) {
        $scope.title = "Search Engine List";
        $scope.items = ItemProxy.getItems();
    })
    .controller("InternalController", function($scope) {
        $scope.id = $scope.item.id;
        $scope.title = $scope.item.title;
        $scope.url = $scope.item.url;
        $scope.tags = $scope.item.tags;
        $scope.description = $scope.item.description;

    })
    .factory("ItemProxy", function ($resource) {
        var Items = $resource('data/ang-04-data.json');
        return {
            getItems : function () {
                return Items.query();
            }
        };
    });
