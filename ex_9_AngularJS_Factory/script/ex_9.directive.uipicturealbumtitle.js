(function () {
    angular
        .module('ex_9')
        .directive('uiPictureAlbumTitle', uiPictureAlbumTitle);
        
    function uiPictureAlbumTitle() { 
        return {
            template: function(elem, attr){
                return attr.albtitle;
            }
        };     
    }
    
})();