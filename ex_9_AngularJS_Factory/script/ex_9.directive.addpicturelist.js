(function () {
    angular
        .module('ex_9')
        .directive('addpicturelist', addpicturelist);
        
    function addpicturelist() { 
        return {
            restrict: 'E',
            template: '<ul id="ul">' +                                                
                         '<li id="li" ui-picture ng-repeat="picture in albumCount = (album | limitTo:quantity) track by $index" data-ng-show="$index % step == 0"  ng-attr-picture="picture" ng-attr-index="$index">' +
                         '</li>' +
                      '</ul>'
        };      
    }
    
})();