/**
 * Created by Moon on 06.07.2015.
 */


var React = require('react');

var MyWork = React.createFactory(require('../components/myWork'));



var WorksController = {


  start: function(req, res, next){
    "use strict";




    var myWorkRender = React.renderToString(MyWork({}));

    res.view('myWork', {react: myWorkRender});



  },



  getTable: function(req, res, next){
    "use strict";




    User.find({}).exec(function(err, users) {



        res.json(users);




      });




  },



  addProcess: function(req, res, next){
    "use strict";





    Process.create({
      name: req.body.name,







    }, function (err, passport) {
      if (err) {
        if (err.code === 'E_VALIDATION') {
          req.flash('error', 'Error.Passport.Password.Invalid');
        }

        return res.redirect('/');
      }




    });









  }









};



module.exports = WorksController;
