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










};



module.exports = WorksController;
