/**
 * Created by Moon on 08.07.2015.
 */

var moment = require('moment');
moment.locale('ru');

var Notif = {

  attributes: {



    text: {type: 'string'},


    date: {
      type: 'string', defaultsTo: function () {
        "use strict";

        return moment().startOf('minute').fromNow();


      }
    },


    user: {model: 'User'}


  }


};




module.exports = Notif;
