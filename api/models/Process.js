/**
 * Created by Moon on 06.07.2015.
 */

var moment = require('moment');

var Process = {

  attributes: {



    name: {type: 'string'},


    type: {type: 'string'},




    dateTimeStart: {type: 'string', defaultsTo: function(){
      "use strict";

      return moment().format('LLL');



    }},


    dueDateTime: {type: 'string'},



    initiator: {type: 'string'},


    answerable: {type: 'array'},


    matching: {type: 'array'},


    text: {type: 'string'},


    files: {type: 'array'},

    status: {type: 'string', defaultsTo: function(){
      "use strict";



      return 'В работе';


    }},







    company: {model: 'Company'},


    documents: {type: 'array'},






    //TODO:Ссылки на коллекции, далее будут проверяться


    archive: {collection: 'Archive', via: 'process'}, //это еще одно поле в таблице мои процессы


    comments:  {collection: 'Comments', via: 'process'}, //Комментарии будут внутри процесса


    //Дочерние процессы
    dprocess: {collection: 'DProcess', via: 'process'} //Будут в самой таблице Мои процессы









  }









};



module.exports = Process;
