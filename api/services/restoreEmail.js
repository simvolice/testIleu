/**
 * Created by Moon on 30.06.2015.
 */



exports.restoreEmail = function(req, res, next){
  "use strict";



  if (req.query.id === '') {

    return res.badRequest('Передан нулевой параметр из письма');

  }else {


    User.findOne({verifTokenEmail: req.query.id}, function (err, result) {

      if (err) {

        return res.badRequest('Пользователь не существует');

      }





      return res.redirect('/restorepass?email=' + req.query.email)


    });


  }











};
