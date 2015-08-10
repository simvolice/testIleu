/**
 * Created by Moon on 08.07.2015.
 */



var Archive = {

  attributes: {


    url: {type: 'string'},

    name: {type: 'string'},


    type: {type: 'string'},




    dateTimeStart: {type: 'string'},


    dueDateTime: {type: 'string'},



    initiator: {type: 'string'},


    answerable: {type: 'array'},


    performer: {type: 'array'},


    text: {type: 'string'},


    files: {type: 'array'},

    status: {type: 'string', defaultsTo: function(){
      "use strict";



      return 'Завершен';


    }},

    documents: {type: 'array'},






    company: {model: 'Company'},

    process: {model: 'Process'},



    dprocess: {type: 'array'}



  }


};


module.exports = Archive;
