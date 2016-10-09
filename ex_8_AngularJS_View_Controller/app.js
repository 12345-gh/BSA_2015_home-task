(function () {
    //        AngularJS      Application Name    Dependencies (Othe library we might need)
    var app = angular.module('ex_8',            []);

    /***** CONTROLLER PRODUCTS  *****/
    app.controller('StoreController', ['$scope', function($scope) {
        // product
        $scope.products = goods;
        
        // function
        $scope.countProducts = function(countFilteredProduct){
            if (countFilteredProduct.length == 1){
                return "1 product is selected from " + $scope.products.length + " products";
            } else {
                return countFilteredProduct.length + " products are selected from " + $scope.products.length + " products";
            }
        };
        
        $scope.addItem = function( item ){
            if (item !== undefined && item.length > 0){
                $scope.products.push({ name: item, price: (Math.random() * 100).toFixed(2) });
                $scope.filterProducts = "";
            }
        };
        
        $scope.delete = function ( idx ) {
            $scope.products.splice(idx, 1);
        };
        
        $scope.visible = true;
        $scope.showList = "Скрыть список";
        
        $scope.show = function () {
            if ( $scope.visible ) {
                $scope.visible = false;
                $scope.showList = "Показать список";
            } else {
                $scope.visible = true;
                $scope.showList = "Скрыть список";
            }            
        };
        
    }]);
    
    var goods = [
        {
            name: 'TV',
            price: 199.95
        },
        {
            name: 'DVD-Player',
            price: 99.97
        },
        {
            name: 'Acoustic Systems',
            price: 299.99
        }
    ];
    /***** END CONTROLLER PRODUCTS *****/  
    
    /***** CONTROLLER CUSTOMERS  *****/
    app.controller('CustomersController', ['$scope', function( $scope ) {
        
        $scope.customers = people;
        
        // function countCustomers
        $scope.countCustomers = function( countFilteredCustomer ){
            if ( countFilteredCustomer.length == 1 ){
                return "1 customer is selected from " + $scope.customers.length + " customers";
            } else {
                return countFilteredCustomer.length + " customers are selected from " + $scope.customers.length + " customers";
            }
        };
        
        $scope.customerString = function( customer ) {
            return "Пользователь: " + customer.name.toUpperCase()
                 + "; возраст: " + customer.age
                 + "; город проживания: " + customer.city;  
        };

        var city = ['Toronto', 'Orlando', 'Chili', 'Alaska'];
        var ava = ['http://i.imgur.com/CfPXI.jpg',
                   'http://uberartist.com/carbon/KenWebIconS.png',
                   'http://uberartist.com/carbon/MattWebIconS.png'
                  ]
        
        $scope.addItem = function( item ){
            if (item !== undefined && item.length > 0){
                var citiId = Math.floor(Math.random()*city.length);
                var avaId = Math.floor(Math.random()*ava.length);
                
                $scope.customers.push({ 
                    name: item, 
                    age: Math.floor((Math.random() * 100) + 1) , 
                    city: city[citiId],
                    avatar: [{
                        full: ava[avaId],
                        thumb: ava[avaId]
                    }]
                });
                $scope.filterCustomersName = "";
            }
        };
        
        $scope.delete = function ( idx ) {
            $scope.customers.splice(idx, 1);
        };
        
        $scope.visible = true;
        $scope.showList = "Скрыть список";
        
        $scope.show = function () {
            if ( $scope.visible ) {
                $scope.visible = false;
                $scope.showList = "Показать список";
            } else {
                $scope.visible = true;
                $scope.showList = "Скрыть список";
            }            
        };
        
    }]);
    
    var people = [
            {
                name: 'John Smith',
                age: 22,
                city: 'New York',                
                avatar: [
                    {
                        full: 'http://i.imgur.com/CfPXI.jpg',
                        thumb: 'http://i.imgur.com/CfPXI.jpg'
                    }
                ]
            },
            {
                name: 'John Doe',
                age: 25,
                city: 'Washington DC',                
                avatar: [
                    {
                        full: 'http://uberartist.com/carbon/KenWebIconS.png',
                        thumb: 'http://uberartist.com/carbon/KenWebIconS.png'
                    }
                ]
            },
            {
               name: 'Will Smith',
                age: 43,
                city: 'Canada',                
                avatar: [
                    {
                        full: 'http://uberartist.com/carbon/MattWebIconS.png',
                        thumb: 'http://uberartist.com/carbon/MattWebIconS.png'
                    }
                ]
            }
        ];
    /***** END CONTROLLER CUSTOMERS *****/  
    
})();
