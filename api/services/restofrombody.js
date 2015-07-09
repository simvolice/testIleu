/**
 * Created by Moon on 30.06.2015.
 */



exports.restofrombody = function(req, res, next){
  "use strict";



  User.findOne({email: req.body.email}, function (err, result) {

    if (err) {

      return res.badRequest('Пользователь не существует');

    }


    Passport.update({user: result.id}, {password: req.body.password})
      .exec(function (err, users) {





       return res.redirect('/login');

      });

  });







};
