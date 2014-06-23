var angularApp02 = angular.module("angularApp02", ['ngResource']);

angularApp02.controller("mainPageController", function($scope, ItemProxy) {
    $scope.title = "Search Engine List";
    $scope.items = ItemProxy.getItems();
});

angularApp02.factory("ItemProxy", function ($resource) {
    var Items = $resource('data/ang-02-data.json');
    return {
        getItems : function () {
            return Items.query();
        }
    };
});
