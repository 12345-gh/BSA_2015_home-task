(function () {
    angular
        .module('ex_9')
        .service('resourceGetDataService', resourceGetDataService);
        
    function resourceGetDataService( $resource ) { 
        this.resList = function() {
            return $resource('http://jsonplaceholder.typicode.com/photos/');            
        };     
    }
    
})();