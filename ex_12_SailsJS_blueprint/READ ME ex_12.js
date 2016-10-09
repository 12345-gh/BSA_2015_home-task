/* global console */
/*
    - Поднять сервер SailsJS.
    - Реализовать REST API из домашнего по HTTP с помощью средств Sailsjs.
    - Реализовать REST API по которым вернется ошибка (400, 404) обычным сообщением.
    - Реализовать REST API по которым вернется ошибка и отобразится в соответствующем темплейте c кастомным сообщением.
    - Реализовать REST API c использованием blueprint
    - Данные для REST API сгенерировать и хранить любым образом.

    BEFORE START NEED TODO:
        npm -g install sails
        in folder with project need todo: sails new name_project
        than: cd name_project
        generate api: 
            sails generate api restapi
            sails generate api country
            sails generate api hotel
        start server: sails lift 
    
    HOW TO TEST REST API
        POST http://localhost:1337/restapi/country 
            {name: 'USA'}
        GET http://localhost:1337/restapi/country
        GET http://localhost:1337/restapi/country/USA
        PUT http://localhost:1337/restapi/country/USA
            {name: 'UK'}
        DELETE http://localhost:1337/restapi/country/UK
        
        POST http://localhost:1337/restapi/country/USA/hotel
            {name: 'YYY'}
        POST http://localhost:1337/restapi/country/USA/hotel
            {name: 'ZZZ'}
        GET http://localhost:1337/restapi/country/USA/hotel
        GET http://localhost:1337/restapi/country/USA/hotel/YYY
        PUT http://localhost:1337/restapi/country/USA/hotel/YYY
            {name: 'WWW'}
        DELETE http://localhost:1337/restapi/country/UK/hotel/WWW
        
        -- BluePrint
        GET http://localhost:1337/restapi/mcountry
        GET http://localhost:1337/restapi/mcountry?countryname=USA
        POST http://localhost:1337/restapi/mcountry?name=Italy
        GET http://localhost:1337/restapi/mcountry/create?name=Moldova
        GET http://localhost:1337/restapi/mcountry/USA/hotel/Hilton/update?name=Plaza
        GET http://localhost:1337/restapi/mcountry/hotel/update?name=Plaza&countryname=USA&hotelname=Hilton
        
*/