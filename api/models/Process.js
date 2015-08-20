/**
 * Created by Moon on 06.07.2015.
 */

var moment = require('moment');
moment.locale('ru');
var uuid = require('node-uuid');



var Process = {

  attributes: {




    catalogs: {type: 'json'},

    url: {type: 'string', defaultsTo: function(){


      return sails.getBaseurl() + '/processlist?id=' + uuid.v4();



    }},

    name: {type: 'string'},


    type: {type: 'string'},




    dateTimeStart: {type: 'string', defaultsTo: function(){
      "use strict";

      return moment().format('LLL');



    }},


    dueDateTime: {type: 'string'},




    initiator: {type: 'string'},


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









    //TODO:Ссылки на коллекции, далее будут проверяться


    archive: {collection: 'Archive', via: 'process'}, //это еще одно поле в таблице мои процессы


    comments:  {collection: 'Comments', via: 'process'}, //Комментарии будут внутри процесса


    //Дочерние процессы
    dprocess: {type: 'array'} //Будут в самой таблице Мои процессы









  }









};



module.exports = Process;
