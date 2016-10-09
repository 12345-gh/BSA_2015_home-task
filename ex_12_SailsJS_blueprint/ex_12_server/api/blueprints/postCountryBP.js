/* global module, Country */
/**
 * BluePrint postCountryBP Controller
 */

module.exports = function postCountryBP (req, res){
    // INSERT
    if (req.param('name') !== undefined) {
        Country.create({name: req.param('name')})
            .exec(function (err, country){
                if (err) {
                    return res.serverError(err); // '500 Internal Server Error\n'
                }
                return res.send('201 Created\n', country);
            });
    } else {
        return res.serverError(err); // '500 Internal Server Error\n'    
    }
};
