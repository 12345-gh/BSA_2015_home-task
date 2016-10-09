/**
 * RestapiController
 *
 * @description :: Server-side logic for managing restapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // BAD
    badRequest : function (req, res){
        res.badRequest('400 BAD request');
    }
};

