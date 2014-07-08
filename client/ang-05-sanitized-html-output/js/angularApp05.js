// http://stackoverflow.com/questions/17982561/using-angular-templates-to-generate-exportable-html
// todo: get rid of timeout, event dispatching would be much better
// todo: move directive to a module 

angular.module('angularApp05', ["angSanitizer"])
.directive('outputGenerator', function($compile, $rootScope, angSanitize) {
    var model = {
        items : [{
            id: "item01",
            name: "First Item"
        },{
            id: "item02",
            name: "Second Item"
        },{
            id: "item03",
            name: "Third Item"
        }]
        },
        templateText = '<div ng-repeat="item in items">{{item.id}} ) {{item.name}}</div>';

    return {
        restrict: 'A',
        templateUrl: "template/output-generator.html",
        scope: true,

        link: function($scope, elem) {
            var previewEl = $(elem.find('#preview'));

            $scope.template = templateText;
            $scope.modelString = JSON.stringify(model);
            $scope.output = '';
            $scope.update = update;

            var $isolatedScope;

            function update() {
                var template = $($scope.template);

                model = JSON.parse($scope.modelString);

                if ($isolatedScope) {
                    $isolatedScope.$destroy();
                }
                $isolatedScope = $rootScope.$new(true);

                for (var p in model) {
                    $isolatedScope[p] = model[p];
                }

                /*$scope.$apply(function() {
                    $compile(hiddenElem.html(template))($isolatedScope);
                    $scope.output = hiddenElem.html();
                });*/

                $compile(previewEl.html(template))($isolatedScope);
                setTimeout(function(){
                    $scope.output = previewEl.html();
                    $scope.cleanOutput = angSanitize($scope.output);
                    $scope.$apply();
                }, 500);
            }

            $scope.$watch('template', update);
            $scope.$watch('modelString', update);
            setTimeout(update, 500);
        }
    };
});