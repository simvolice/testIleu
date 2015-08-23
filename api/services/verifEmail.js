/**
 * Created by Moon on 30.06.2015.
 */


exports.verifEmail = function(req, res, next){
  "use strict";







  if (req.query.id == null) {

    return res.badRequest('Ваш индитификатор пустой');

  }else {


    User.findOne({verifTokenEmail: req.query.id}, function (err, result) {

      if (err) {

        return res.badRequest(err);

      }

      if (result == null){

        return res.badRequest('Вы используете не правильный индитификатор');

      }
      if (result.verificatedEmail) {


        return res.redirect('/alreadyconfirm');

      }


      User.update({verifTokenEmail: req.query.id}, {verificatedEmail: true})
        .exec(function (err, users) {

          return res.redirect('/login');


        });



    });


  }







};
