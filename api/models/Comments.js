/**
 * Created by Moon on 09.07.2015.
 */


var moment = require('moment');
moment.locale('ru');

var Comments = {

  attributes: {





    process: {model: 'Process'},

    author: {type: 'string'},

    text: {type: 'string'},


    dateWrite: {type: 'string', defaultsTo: function(){
      "use strict";


      return  moment().startOf('minute').fromNow();





    }}














  }








};




module.exports = Comments;
