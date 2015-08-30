var uuid = require('node-uuid');



module.exports = {


  attributes: {




//TODO:Стандартные атрибуты, далее будут проверяться




    displayname: {type: 'string'},

    socketid: {type: 'string'},



    companyYes: {type: 'boolean', defaultsTo: function(){


      return false;


    }},

    nameprocessYes: {type: 'boolean', defaultsTo: function(){


      return false;

    }},



    email     : { type: 'email',  unique: true },


    role: {type: 'string', defaultsTo: 'user'},




    avatar: {type: 'string', defaultsTo: function(){


      return 'noavatar.jpg';


    }},


    firstname: {type: 'string'},




    lastname: {type: 'string'},




    datebirth: {type: 'string'},


    city: {type: 'string'},



    hobby: {type: 'string'},


    gender: {

      type: 'string',

      enum: ['male', 'female']


    },


    position: {type: 'string', required: true, defaultsTo: function(){
      "use strict";


      return 'Сотрудник';



    }},









    verificatedEmail: {type: 'boolean', defaultsTo: false},





    verifTokenEmail: {type: 'string', defaultsTo: function(){
      "use strict";

      return uuid.v4();

    }},



    inProcess: {type: 'array'},


    outProcess: {type: 'array'},

    dueProcess: {type: 'array'},


    roleInProcess: {type: 'string'},









//TODO:Ссылки на коллекции, далее будут проверяться
    company : { collection: 'Company', via: 'user' },

    notif : { collection: 'Notif', via: 'user' },


    passports : { collection: 'Passport', via: 'user' }




  }








};

