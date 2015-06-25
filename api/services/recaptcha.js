/**
 * Created by Moon on 25.06.2015.
 */

var simple_recaptcha = require('simple-recaptcha-new');

exports.verifyCaptcha = function(privateKey, req, res, next) {


    var privateKey = privateKey; // your private key here
    var ip = req.ip;
    var response = req.body['g-recaptcha-response'];

   return simple_recaptcha(privateKey, ip, response, function (err) {
        if (err) {


            return err;

        }

    });




};








