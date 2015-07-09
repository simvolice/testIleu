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

      return  moment().startOf('minute').fromNow();



    }},


    dueDateTime: {type: 'string'},



    initiator: {type: 'string'},


    performer: {type: 'array'},


    matching: {type: 'array'},


    text: {type: 'string'},


    files: {type: 'array'},

    status: {type: 'string', defaultsTo: function(){
      "use strict";



      return 'В работе';


    }},



    //Метка, показывающая: Исходящий, Входящий, Просроченный
    label: {type: 'string'},



    company: {model: 'Company'},









    //TODO:Ссылки на коллекции, далее будут проверяться


    archive: {collection: 'Archive', via: 'process'},


    comments:  {collection: 'Comments', via: 'process'},


    //Дочерние процессы
    dprocess: {collection: 'DProcess', via: 'process'}







  }









};



module.exports = Process;
