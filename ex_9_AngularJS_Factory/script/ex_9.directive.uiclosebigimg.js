(function () {
    angular
        .module('ex_9')
        .directive('uiCloseBigImg', uiCloseBigImg);
        
    function uiCloseBigImg() { 
        return {
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    elem.remove();
                });
            }
        };      
    }
    
})();