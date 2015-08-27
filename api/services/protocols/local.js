var validator = require('validator'),
 crypto    = require('crypto'),
    reqap = require('../recaptcha'),
    mailSend = require('../mail');
var fs = require('fs');


/**
 * Local Authentication Protocol
 *
 * The most widely used way for websites to authenticate users is via a username
 * and/or email as well as a password. This module provides functions both for
 * registering entirely new users, assigning passwords to already registered
 * users and validating login requesting.
 *
 * For more information on local authentication in Passport.js, check out:
 * http://passportjs.org/guide/username-password/
 */

/**
 * Register a new user
 *
 * This method creates a new user from a specified email, username and password
 * and assign the newly created user a local Passport.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.register = function (req, res, next) {












    var email    = req.param('email');

    var password = req.param('password');

  var firstname = req.param('firstname');

var lastname = req.param('lastname');







  if (!email) {
    req.flash('error', 'Error.Passport.Email.Missing');
    return next(new Error('No email was entered.'));
  }

  if (!firstname) {
    req.flash('error', 'Error.Passport.firstname.Missing');
    return next(new Error('No firstname was entered.'));
  }


  if (!lastname) {
    req.flash('error', 'Error.Passport.lastname.Missing');
    return next(new Error('No lastname was entered.'));
  }


  if (!password) {
    req.flash('error', 'Error.Passport.Password.Missing');
    return next(new Error('No password was entered.'));
  }


    var err = reqap.verifyCaptcha('6Lembf8SAAAAAEilWPBaKbj_By8g16NRghWF-LKa', req, res, next);

    if (err){

        req.flash('error', 'Request respond');
        return next(new Error('Request respond'));

    }












  User.create({

    displayname: firstname + ' ' + lastname,
    lastname : lastname
  , email    : email,
   firstname: firstname,
    outProcess: [],
    inProcess: [],
    dueProcess: []
  }, function (err, user) {
    if (err) {
      if (err.code === 'E_VALIDATION') {
        if (err.invalidAttributes.email) {
          req.flash('error', 'Error.Passport.Email.Exists');
        }
      }

      return next(err);
    }


    var token = crypto.randomBytes(48).toString('base64');

  Passport.create({
      protocol    : 'local'
    , password    : password
    , user        : user.id
    , accessToken : token
    }, function (err, passport) {
      if (err) {
        if (err.code === 'E_VALIDATION') {
          req.flash('error', 'Error.Passport.Password.Invalid');
        }

        return user.destroy(function (destroyErr) {
          next(destroyErr || err);
        });
      }




    });


    User.findOne({email: email}, function(err, result){


          mailSend.sendMail('emailReg', result.verifTokenEmail, email, 'Подтверждение регистрации');


      fs.mkdir(process.cwd() + '/.tmp/public/driver/' + result.email,function(err){

        sails.log(err);

      });


      fs.mkdir(process.cwd() + '/.tmp/public/driver/' + result.email +'/company/',function(err){

        sails.log(err);

      });



       return  res.redirect('/confirmemail');




      });



  });







};

/**
 * Assign local Passport to user
 *
 * This function can be used to assign a local Passport to a user who doens't
 * have one already. This would be the case if the user registered using a
 * third-party service and therefore never set a password.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
exports.connect = function (req, res, next) {
  var user     = req.user
    , password = req.param('password');

  Passport.findOne({
    protocol : 'local'
  , user     : user.id
  }, function (err, passport) {
    if (err) {
      return next(err);
    }

    if (!passport) {
      Passport.save({
        protocol : 'local'
      , password : password
      , user     : user.id
      }, function (err, passport) {
        next(err, user);
      });
    }
    else {
      next(null, user);
    }
  });
};

/**
 * Validate a login request
 *
 * Looks up a user using the supplied identifier (email or username) and then
 * attempts to find a local Passport associated with the user. If a Passport is
 * found, its password is checked against the password supplied in the form.
 *
 * @param {Object}   req
 * @param {string}   identifier
 * @param {string}   password
 * @param {Function} next
 */
exports.login = function (req, identifier, password, next) {




    var isEmail = validator.isEmail(identifier)
    , query   = {};

  if (isEmail) {
    query.email = identifier;
  }


  User.findOne(query, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      if (isEmail) {
        req.flash('error', 'Error.Passport.Email.NotFound');
      }

      return next(null, false);
    }

    Passport.findOne({
      protocol : 'local'
    , user     : user.id

    }, function (err, passport) {
      if (passport) {
        passport.validatePassword(password, function (err, res) {
          if (err) {
            return next(err);
          }

          if (!res) {
            req.flash('error', req.__('Error.Passport.Password.Wrong'));
            return next(null, false);
          } else {

            return next(null, user);
          }
        });
      }
      else {
        req.flash('error', 'Error.Passport.Password.NotSet');
        return next(null, false);
      }
    });
  });






};
