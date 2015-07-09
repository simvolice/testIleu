/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */

  var forgetService = require('../../api/services/forgetpass');

var restofrombody = require('../services/restofrombody');

var restoreEmail = require('../services/restoreEmail');



var verifEmail = require('../services/verifEmail');



var AuthController = {
  /**
   * Render the login page
   *
   * The login form itself is just a simple HTML form:
   *
      <form role="form" action="/auth/local" method="post">
        <input type="text" name="identifier" placeholder="Username or Email">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Sign in</button>
      </form>
   *
   * You could optionally add CSRF-protection as outlined in the documentation:
   * http://sailsjs.org/#!documentation/config.csrf
   *
   * A simple example of automatically listing all available providers in a
   * Handlebars template would look like this:
   *
      {{#each providers}}
        <a href="/auth/{{slug}}" role="button">{{name}}</a>
      {{/each}}
   *
   * @param {Object} req
   * @param {Object} res
   */



  restofromq: function(req, res, next){
    "use strict";


    restofrombody.restofrombody(req, res, next);

  },

  restorepass: function(req, res, next){
    "use strict";

    res.locals.layout = 'auth/auh.handlebars';


    res.view('restore', {errors: req.flash('error'), emailrestore:req.query.email});




  },


  restore: function(req, res, next){
    "use strict";

restoreEmail.restoreEmail(req, res, next);



    },


  verifemail: function(req, res, next){
      "use strict";



    verifEmail.verifEmail(req, res, next);



  },


  forgetpass: function(req, res, next){
    "use strict";


   forgetService.recover(req, res,next);





  },

  recov: function(req, res, next){
    "use strict";


    res.locals.layout = 'auth/auh.handlebars';


    res.view('forget', {errors: req.flash('error')});





  },

    confirmemail: function(req, res, next){
        "use strict";



        res.locals.layout = 'auth/auh.handlebars';


        res.view('confirmemail');




    },



    alreadyconfirm: function(req, res, next){
        "use strict";



        res.locals.layout = 'auth/auh.handlebars';


        res.view('alreadyconfirm');





    },

  login: function (req, res, next) {

      if (req.user) {

          return res.redirect('/');


      }

    var strategies = sails.config.passport
      , providers  = {};

    // Get a list of available providers for use in your templates.
    Object.keys(strategies).forEach(function (key) {
      if (key === 'local' || key === 'bearer') {
        return;
      }

      providers[key] = {
        name: strategies[key].name
      , slug: key
      };
    });

      res.locals.layout = 'auth/auh.handlebars';


    res.view('authpage', {

      providers : providers
    , errors    : req.flash('error')
    });





  },

  /**
   * Log out a user and return them to the homepage
   *
   * Passport exposes a logout() function on req (also aliased as logOut()) that
   * can be called from any route handler which needs to terminate a login
   * session. Invoking logout() will remove the req.user property and clear the
   * login session (if any).
   *
   * For more information on logging out users in Passport.js, check out:
   * http://passportjs.org/guide/logout/
   *
   * @param {Object} req
   * @param {Object} res
   */
  logout: function (req, res) {


      if (!req.user) return res.redirect('/');

      req.session.destroy();


      res.clearCookie('ileu');

      req.logout();


      res.redirect('/login');
  },

  /**
   * Render the registration page
   *
   * Just like the login form, the registration form is just simple HTML:
   *
      <form role="form" action="/auth/local/register" method="post">
        <input type="text" name="username" placeholder="Username">
        <input type="text" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Sign up</button>
      </form>
   *
   * @param {Object} req
   * @param {Object} res
   */


    forget: function (req, res){


        res.locals.layout = 'auth/auh.handlebars';


        res.view('authpage');


    },

  /**
   * Create a third-party authentication endpoint
   *
   * @param {Object} req
   * @param {Object} res
   */
  provider: function (req, res) {
    passport.endpoint(req, res);
  },

  /**
   * Create a authentication callback endpoint
   *
   * This endpoint handles everything related to creating and verifying Pass-
   * ports and users, both locally and from third-aprty providers.
   *
   * Passport exposes a login() function on req (also aliased as logIn()) that
   * can be used to establish a login session. When the login operation
   * completes, user will be assigned to req.user.
   *
   * For more information on logging in users in Passport.js, check out:
   * http://passportjs.org/guide/login/
   *
   * @param {Object} req
   * @param {Object} res
   */
  callback: function (req, res) {



    function tryAgain (err) {

      // Only certain error messages are returned via req.flash('error', someError)
      // because we shouldn't expose internal authorization errors to the user.
      // We do return a generic error and the original request body.
      var flashError = req.flash('error')[0];

      if (err && !flashError ) {
        req.flash('error', 'Error.Passport.Generic');
      } else if (flashError) {
        req.flash('error', flashError);
      }
      req.flash('form', req.body);

      // If an error was thrown, redirect the user to the
      // login, register or disconnect action initiator view.
      // These views should take care of rendering the error messages.
      var action = req.param('action');

      switch (action) {
        case 'register':


            res.redirect('/login');
          break;
        case 'disconnect':
          res.redirect('back');
          break;
        default:
          res.redirect('/login');
      }
    }

    passport.callback(req, res, function (err, user, challenges, statuses) {





        if (err || !user) {


        return tryAgain(challenges);
      }



      req.login(user, function (err) {
        if (err) {
          return tryAgain(err);
        }



          if (req.body.noremember){
              req.session.cookie.maxAge = 24 * 60 * 60 * 1000;



              return res.redirect('/');



          };

          // Upon successful login, send the user to the homepage were req.user
        // will be available.
        res.redirect('/');
      });
    });





  },

  /**
   * Disconnect a passport from a user
   *
   * @param {Object} req
   * @param {Object} res
   */
  disconnect: function (req, res) {
    passport.disconnect(req, res);
  }
};

module.exports = AuthController;
