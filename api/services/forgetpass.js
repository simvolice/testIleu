/**
 * Created by Moon on 30.06.2015.
 */

var mailSend = require('../services/mail');



exports.recover = function (req, res, next){
  "use strict";




  var email    = req.param('email');




  if (!email) {
    req.flash('error', 'Error.Passport.Email.Missing');
    return next(new Error('No email was entered.'));
  }


  User.findOne({email: email})
    .exec(function(err, user) {

      if (err) {
        req.flash('error', 'Error.Passport.Email.Missing');
        return next(new Error('Пользователь не существует'));
      }else{


        mailSend.sendMail('emailFor', user.verifTokenEmail, email, 'Восстановление пароля');




        return  res.redirect('/recov');

      }

    });












};




