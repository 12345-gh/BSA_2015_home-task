(function () {
    angular
        .module('ex_9')
        .controller('AlbumController', albumController);
        
    function albumController(  $scope, 
                               httpGetDataFactoryOne, 
                               resourceGetDataService ) { 
        
        //----- count show elements
        $scope.quantity = 50; //500 for two resource
        //----- step
        $scope.step = 1; //20 for two resource
      
    
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
//                var obj = {};
//                obj.url = album[i].url;
//                obj.thumbnailUrl = album[i].thumbnailUrl;
//                obj.albumTitle = album[i].title;
//                res.push(obj);   
//            }
//            $scope.album = res;
//        });    
    }
    
})();