/**
 * Created by Moon on 24.08.2015.
 */



module.exports = function (req, res, next) {









    User.update({id: req.user.id}, {socketid: sails.sockets.id(req.socket)}).exec(function(err, user){


        return next();


    });











};