/* global module, Country */
/**
 * BluePrint putCountryBP Controller
 */

module.exports = function putCountryBP (req, res){
    // UPDATE
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
};
