(function () {
    //        AngularJS      Application Name    Dependencies (Othe library we might need)
    var app = angular.module('ex_9',            ['ngResource']);
    
    // ********** FACTORY WITH TWO RESOURCE  **********
    app.factory('httpGetDataFactoryTwo', function ( $http, $q ) {
        
        var factory = {}; 
        
        var photos = $http.get('http://jsonplaceholder.typicode.com/photos').success(function(photo) {
                    factory.resivedPhotos = photo;
                }),
            albums = $http.get("http://jsonplaceholder.typicode.com/albums").success(function(album) {
                    factory.resivedAlbums = album;
                });
        
        factory.pictureList = function () {    
            return $q.all([photos, albums])
                .then(function() { 
                    // This callback would be called when all promised would be resolved
                    var res = [];            
                    
                    for (var i=0;i<factory.resivedPhotos.length;i++) {
                        var obj = {};
                            
                        obj.url = factory.resivedPhotos[i].url;
                        obj.thumbnailUrl = factory.resivedPhotos[i].thumbnailUrl;
                        for (var j=0;j<factory.resivedAlbums.length;j++) {
                            if ( factory.resivedAlbums[j].id == factory.resivedPhotos[i].albumId ) {
                                obj.albumTitle = factory.resivedAlbums[j].title;
                            }
                        }
                        res.push(obj);    
                    }
                        
                    return res;
                });
        };
        
        return factory;            
    });
    // ********** END FACTORY WITH TWO RESOURCE **********
    
    // ********** FACTORY WITH ONE RESOURCE  **********
    app.factory('httpGetDataFactoryOne', function ( $http ) {
        return {
            pictureList: function(callback){
                $http.get('http://jsonplaceholder.typicode.com/photos/').success(callback);
            }
        };       
    });
    // ********** END FACTORY WITH ONE RESOURCE **********
    
    // ********** SERVICE  **********
    app.service('resourceGetDataService', function($resource){
        this.resList = function() {
            return $resource('http://jsonplaceholder.typicode.com/photos/');            
        };
    });
    // ********** END SERVICE **********
    
    // ********** CONTROLLER  **********
    app.controller('AlbomController', function( $scope, httpGetDataFactoryOne, httpGetDataFactoryTwo, resourceGetDataService ) {
        
        //----- count show elements
        $scope.quantity = 50; //500 for two resource
        //----- step
        $scope.step = 1; //20 for two resource
      
        //----- Factory and $http ----- TWO RESOURCE
//        httpGetDataFactoryTwo.pictureList().then( function(album) {
//            $scope.album = album;
//        });
        
        //----- Factory and $http ----- ONE RESOURCE
        httpGetDataFactoryOne.pictureList( function(album) {
            var res = []; 
            for (var i=0;i<album.length;i++) {
                var obj = {};
                obj.url = album[i].url;
                obj.thumbnailUrl = album[i].thumbnailUrl;
                obj.albumTitle = album[i].title;
                res.push(obj);   
            }
            $scope.album = res; 
        });

        // Uncomment this block for use service and $resource
//        resourceGetDataService.resList().query(function( album ) {
//            var res = []; 
//            for (var i=0;i<album.length;i++) {
//                console.log(album[i].url);
//                var obj = {};
//                obj.url = album[i].url;
//                obj.thumbnailUrl = album[i].thumbnailUrl;
//                obj.albumTitle = album[i].title;
//                res.push(obj);   
//            }
//            $scope.album = res;
//        });
        
    });   
    // ********** END CONTROLLER **********
    
    // ********** DIRECTIVE ADDPICTURELIST ********** 
    //Directive that returns an element which adds image list
    app.directive('addpicturelist', function(){
        return {
            restrict: 'E',
            template: '<ul id="ul">'                                                
                        + '<li id="li" ui-picture ng-repeat="picture in albumCount = (album | limitTo:quantity) track by $index" data-ng-show="$index % step == 0"  ng-attr-picture="picture" ng-attr-index="$index">'
                        + '</li>'
                      +'</ul>'
        }
    }); 
    // ********** END DIRECTIVE ADDPICTURELIST ********** 
    
    // ********** DIRECTIVE UI-PICTURE ********** 
    app.directive('uiPicture', function ($compile) {
        return {
            restrict: 'CAE',
            replace: false,
            transclude: false,
            scope: {
                index: '=index',
                item: '=picture'
            },
            template: '<div>'
                        +'<img id="img" ng-src="{{ item.thumbnailUrl }}" ng-attr-url="{{ item.url }}" alt="" />'
                        +'<p ui-picture-album-title ng-attr-albtitle="{{ item.albumTitle }}"></p>'
                     +'</div>',
            
            link: function (scope, elem, attrs) {
                elem.find('img').bind('click', function () {
                      angular.element(document.getElementById('space-for-big-pic')).append(
                          $compile('<div id="parent_popup" ui-close-big-img> <div id="popup">' 
                                     +'<img id="big-img" src="'+scope.item.url+'" alt="" />'
                                     +'<p id="title-big-img">'+scope.item.albumTitle+'</p>'
                                  +'</div></div>')(scope));
                });
            }
        };
    });
    // ********** END DIRECTIVE UI-PICTURE ********** 
    
    // ********** DIRECTIVE UI-PICTURE ********** 
    app.directive('uiCloseBigImg', [function () {
        return {
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    //elem.css('display', 'none');
                    elem.remove();
                });
            }
        };
    }]);
    // ********** END DIRECTIVE UI-PICTURE ********** 
    
    // ********** DIRECTIVE ALBUM TITLE ********** 
    app.directive('uiPictureAlbumTitle', function() {
       
        return {
            template: function(elem, attr){
                return attr.albtitle;
            }
            // or without attr            
            //template: '{{ picture.albumTitle }}'
        };
    });
    // ********** END DIRECTIVE ALBUM TITLE ********** 
    
})();