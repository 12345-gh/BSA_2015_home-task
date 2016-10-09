/* global module, Country */
/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // SELECT
    getallCountry : function (req, res){
        Country.find().populate('hotel').exec(function(err, result){
            if (err) {
                return res.send("500 Internal Server Error\n", err);
            }
            if (result.length > 0) {
                return res.send('200 OK\n', result);
            } else {
                return res.send("404 Not Found\n", result); 
            }
        });
    },
    getCountry : function (req, res){
        Country.find().where({name: req.param('countryname')}).populate('hotel').exec(function(err, result){
            if (err) {
                return res.send("500 Internal Server Error\n", err);
            }
            if (result.length > 0) {
                return res.send('200 OK\n', result);
            } else {
                return res.view('404', {msg: 'Sorry, this is bad request!'});
            }
        });
    },
    // INSERT
    createCountry : function (req, res){
        Country.create({name: req.param('name')}).exec(function (err, country){
            if (err) {
                return res.send("500 Internal Server Error\n", err);
            }
            return res.send('201 Created\n', country);
        });
    },
    // UPDATE
    updateCountry : function (req, res){
        Country.update({name: req.param('countryname')},{name: req.param('name')}).exec(function afterwards(err, updated){
            if (err) {
                return res.send("500 Internal Server Error\n", err);
            }
            if (result.length > 0) {
                return res.send('200 OK\n', updated);
            } else {
                return res.view('404', {msg: 'Sorry, this is bad request!'});
            }
        });
    },
    // DELETE
    deleteCountry : function (req, res){
        Country.find().exec(function(err, result){
            result.forEach(function(item){
                if (item.name === req.param('countryname')){
                    Hotel.destroy({ownercountry: item.id})
                        .exec(function deleteCB(err){
                            if (err) {
                                return res.send("500 Internal Server Error\n", err);
                            }
                        });
                }    
            });                
        });
        
        Country.destroy({name: req.param('countryname')})
            .exec(function deleteCB(err){
                if (err) {
                    return res.send("500 Internal Server Error\n", err);
                }
            return res.send('200 OK\n', 'The country ' + req.param('countryname') + ' has been deleted');
            });
    },
    
    // BAD TEMPATE
    badRequest : function (req, res){
        res.view('400', {msg: 'Sorry, this is bad request!'});
    }
    
};

