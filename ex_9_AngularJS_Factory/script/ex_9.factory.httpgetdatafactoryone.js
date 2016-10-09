(function () {
    angular
        .module('ex_9')
        .factory('httpGetDataFactoryOne', httpGetDataFactoryOne);
        
    function httpGetDataFactoryOne( $http ) { 
        return {
            pictureList: function( callback ){
                $http.get('http://jsonplaceholder.typicode.com/photos/')
                    .success( callback )
                    .error( callback );
            }
        };       
    }
    
})();