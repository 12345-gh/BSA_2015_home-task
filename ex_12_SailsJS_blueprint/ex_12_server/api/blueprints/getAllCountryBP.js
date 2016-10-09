/* global module, Country */
/**
 * BluePrint getAllCountryBP Controller
 */

module.exports = function getAllCountryBP (req, res){
    // SELECT
    if (req.param('countryname') === undefined) {
        Country.find().populate('hotel')
            .exec(function(err, result){
                if (err) {
                    return res.serverError(err); // '500 Internal Server Error\n'
                }
                if (result.length > 0) {
                    return res.ok(result); // '200 OK\n'
                } else {
                    return res.view('404', {error: 'Sorry, Not Found!'});
                }
            }); 
    } else {
        Country.find().where({name: req.param('countryname')}).populate('hotel')
            .exec(function(err, result){
                if (err) {
                    return res.serverError(err); // '500 Internal Server Error\n'
                }
                if (result.length > 0) {
                    return res.ok(result); // '200 OK\n'
                } else {
                    return res.view('404', {error: 'Sorry, Not Found!'});
                }
            });
    }
};

