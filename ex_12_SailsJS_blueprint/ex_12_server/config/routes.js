module.exports.routes = {

  '/': {
    view: 'homepage'
  },
    // SELECT COUNTRY
  'get /restapi/country' : 'CountryController.getallCountry',
  'get /restapi/country/:countryname' : 'CountryController.getCountry',
    // INSERT COUNTRY
  'post /restapi/country' : 'CountryController.createCountry',
    // UPDATE COUNTRY
  'put /restapi/country/:countryname' : 'CountryController.updateCountry',  
    // DELETE COUNTRY
  'delete /restapi/country/:countryname' : 'CountryController.deleteCountry', 
    // BAD TEMPLATE
  'get /restapi/bad' : 'CountryController.badRequest',
    
    // SELECT HOTEL
  'get /restapi/country/:countryname/hotel' : 'HotelController.getallHotel',
  'get /restapi/country/:countryname/hotel/:hotelname' : 'HotelController.getHotel',
    // INSERT HOTEL
  'post /restapi/country/:countryname/hotel' : 'HotelController.createHotel',
    // UPDATE HOTEL
  'put /restapi/country/:countryname/hotel/:hotelname' : 'HotelController.updateHotel',  
    // DELETE HOTEL
  'delete /restapi/country/:countryname/hotel/:hotelname' : 'HotelController.deleteHotel',
    
    // BAD TEXT
  'get /bad' : 'RestapiController.badRequest',
    
    // т.к. вверху уже есть все варинты и что бы не делить задание на два 
    // сделано немного дугие строки запросов http, mcountry == country
    // т.к. стандартные уже обрабатываются вверху и это лишает возможности использовать
    // /restapi/:countryname == /restapi/country
    // SELECT COUNTRY BLUEPRINT
  'get /restapi/mcountry' : {blueprint: 'getAllCountryBP'},
    // INSERT COUNTRY BLUEPRINT
  'get /restapi/mcountry/create' : {blueprint: 'postCountryBP'},
  'post /restapi/mcountry' : {blueprint: 'postCountryBP'},
    // UPDATE HOTEL BLUEPRINT
  'get /restapi/mcountry/:countryname/hotel/:hotelname/update' : {blueprint: 'putCountryBP'},
  'get /restapi/mcountry/hotel/update' : {blueprint: 'putCountryBP'}
    
    // Вся суть этих роутов blueprint сводится к созданию файла в папке blueprints с именем идентичным 
    // идентичным : {blueprint: 'название файла'} и module.exports = function название файла (req, res){}
    // отличие в том что в blueprint http рекомендовано использовать параметри через "?",
    // например ?where={"name":USA} и тому подобные, также можно, например созавать записи,
    // как через класический POST, так и GET /country/create?name=USA

};
