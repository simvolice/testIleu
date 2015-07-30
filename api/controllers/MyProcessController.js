/**
 * Created by Moon on 30.07.2015.
 */


var undescore = require('underscore');


var MyProcessController = {



  view: function(req, res, next){


    User.findOne({id: req.user.id}).exec(function(err, user){
    Company.findOne({user: user.id}).exec(function(err, company){
      Process.find({company: company.id}).exec(function(err, process){





        res.view('myprocess', {process: process });








      });









    });









    });














  }





};




module.exports = MyProcessController;
