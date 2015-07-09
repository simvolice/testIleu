/**
 * Created by Moon on 30.06.2015.
 */


exports.verifEmail = function(req, res, next){
  "use strict";





  if (req.query.id === '') {

    return res.badRequest();

  }else {


    User.findOne({verifTokenEmail: req.query.id}, function (err, result) {

      if (err) {

        return res.badRequest(err);

      }
      if (result.verificatedEmail) {


        return res.redirect('/alreadyconfirm');

      }


      User.update({verifTokenEmail: req.query.id}, {verificatedEmail: true})
        .exec(function (err, users) {

          users.verificatedEmail = true;


        });

      return res.redirect('/login');

    });


  }







};
