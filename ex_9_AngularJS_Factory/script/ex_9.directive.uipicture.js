(function () {
    angular
        .module('ex_9')
        .directive('uiPicture', uiPicture);
        
    function uiPicture( $compile ) { 
        return {
            restrict: 'CAE',
            replace: false,
            transclude: false,
            scope: {
                index: '=index',
                item: '=picture'
            },
            template: '<div>'+
                         '<img id="img" ng-src="{{ item.thumbnailUrl }}" ng-attr-url="{{ item.url }}" alt="" />'+
                         '<p ui-picture-album-title ng-attr-albtitle="{{ item.albumTitle }}"></p>'+
                      '</div>',
            
            link: function (scope, elem, attrs) {
                elem.find('img').bind('click', function () {
                      angular.element(document.getElementById('space-for-big-pic')).append(
                          $compile('<div id="parent_popup" ui-close-big-img> <div id="popup">'+ 
                                     '<img id="big-img" src="'+scope.item.url+'" alt="" />'+
                                     '<p id="title-big-img">'+scope.item.albumTitle+'</p>'+
                                   '</div></div>')(scope));
                });
            }
        };      
    }
    
})();