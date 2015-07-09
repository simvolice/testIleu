/**
 * Created by Moon on 09.07.2015.
 */



var DProcess = {

  attributes: {

    process: {model: 'Process'},







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








    //TODO:Ссылки на коллекции, далее будут проверяться


    archive: {collection: 'Archive', via: 'dprocess'},


    comments:  {collection: 'Comments', via: 'dprocess'},

















  }










};


module.exports = DProcess;
