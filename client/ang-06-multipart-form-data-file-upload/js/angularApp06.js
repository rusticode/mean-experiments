// based on:
// http://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
var app = angular.module('angularApp06', [])
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])
app.service('fileUpload', function fileUploadCtrl($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
            //headers: {'Content-Type': "multipart/form-data"}
        }).success(function(){
        }).error(function(){
        });
    }
});
app.controller("FileUploadController", function($scope, fileUpload) {
    var file = $scope.myFile;
    var uploadUrl = 'http://www.example.com/images';
    $scope.sendFile = function() {
        fileUpload.uploadFileToUrl(file, uploadUrl);
    }
});