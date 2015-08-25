/**
 * Created by Moon on 08.07.2015.
 */



    var uuid = require('node-uuid');

var moment = require('moment');
moment.locale('ru');

var Notif = {

  attributes: {

    labelforemployees: {type: 'boolean'},

    idforattr: {type: 'uuid', defaultsTo: function(){

      return uuid.v4();

    }},

    fromreq: {type: 'string'},

    htmlcontent: {type: 'string'},

    text: {type: 'string'},


    read: {type: 'boolean', defaultsTo: function(){


      return false;

    }},

    date: {
      type: 'string', defaultsTo: function () {


        return moment().startOf('minute').fromNow();


      }
    },


    user: {model: 'User'}


  }


};




module.exports = Notif;
