/**
 * Created by Moon on 21.06.2015.
 */
module.exports = function(req, res, next){
    "use strict";


    if (req.session.authenticated === true){

        next();

    }else{

       res.i18n('Error.Access.Deniede');

    }








};