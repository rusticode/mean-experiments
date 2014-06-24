


var angularApp02 = angular.module("angularApp02", ['ngResource']);
angularApp02.filter("capitalize", function() {
    return function(string) {
        var regExp = /\b[a-z](?=[a-z]{2})/g;
        return string.replace(regExp, function(char) {
            return char.toUpperCase();
        });
    }
})

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
