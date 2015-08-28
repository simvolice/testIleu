/**
 * Created by Moon on 06.07.2015.
 */

var moment = require('moment');
moment.locale('ru');
var uuid = require('node-uuid');



var Process = {

  attributes: {





    archive: {type: 'boolean', defaultsTo: function(){

      return false;


    }},


    connectprocess: {type: 'array'},

    url: {type: 'string', defaultsTo: function(){


      return sails.getBaseurl() + '/processlist?id=' + uuid.v4();



    }},

    name: {type: 'json'},


    type: {type: 'string'},




    dateTimeStart: {type: 'string', defaultsTo: function(){
      "use strict";

      return moment().format('LLL');



    }},


    dueDateTime: {type: 'string'},




    initiator: {type: 'json'},


    answerable: {type: 'array'},


    performer: {type: 'array'},


    text: {type: 'string'},


    files: {type: 'array'},

    status: {type: 'string', defaultsTo: function(){
      "use strict";



      return 'В работе';


    }},



    documents: {type: 'array'},




    company: {model: 'Company'},




    dprocess: {type: 'array'},//Будут в самой таблице Мои процессы






    comments:  {collection: 'Comments', via: 'process'} //Комментарии будут внутри процесса













  }









};



module.exports = Process;
