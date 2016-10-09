/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// SELECT
    getallHotel : function (req, res){
        Country.find().exec(function(err, result){
            result.forEach(function(item){
                if (item.name === req.param('countryname')){
                    Hotel.find().where({ownercountry: item.id})
                        .exec(function(err, result){
                            if (err) {
                                return res.send("500 Internal Server Error\n", err);
                            }
                            return res.send('200 OK\n', result);
                        });
                }    
            });                
        });
    },
    getHotel : function (req, res){
        Country.find().exec(function(err, result){
            result.forEach(function(item){
                if (item.name === req.param('countryname')){
                    Hotel.find().where({ownercountry: item.id, name: req.param('hotelname')})
                        .exec(function(err, result){
                            if (err) {
                                return res.send("500 Internal Server Error\n", err);
                            }
                            return res.send('200 OK\n', result);
                        });
                }    
            });                
        });
    },
    
    // INSERT
    createHotel : function (req, res){
        Country.find().exec(function(err, result){
            result.forEach(function(item){
                if (item.name === req.param('countryname')){
                    Hotel.create({name: req.param('name'), ownercountry: item.id})
                        .exec(function (err, hotel){
                            if (err) {
                                return res.send("500 Internal Server Error\n", err);
                            }
                            return res.send('201 Created\n', hotel);
                        });
                }    
            });                
        });
    },
    
    // UPDATE
    updateHotel : function (req, res){
        Country.find().exec(function(err, result){
            result.forEach(function(item){
                if (item.name === req.param('countryname')){
                    Hotel.update({name: req.param('hotelname')},{name: req.param('name')})
                        .exec(function afterwards(err, updated){
                            if (err) {
                                return res.send("500 Internal Server Error\n", err);
                            }
                            return res.send('200 OK\n', updated);
                        });
                }    
            });                
        });
    },
    
    // DELETE
    deleteHotel : function (req, res){
        Country.find().exec(function(err, result){
            result.forEach(function(item){
                if (item.name === req.param('countryname')){
                    Hotel.destroy({ownercountry: item.id, name: req.param('hotelname')})
                        .exec(function deleteCB(err){
                            if (err) {
                                return res.send("500 Internal Server Error\n", err);
                            }
                        return res.send('200 OK\n', 'The hotel ' + req.param('hotelname') + ' has been deleted');
                        });
                }    
            });                
        });
    }   
    
};

