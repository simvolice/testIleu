var uuid = require('node-uuid');
module.exports = {


  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
      verificatedEmail: {type: 'boolean', defaultsTo: false},


      verifTokenEmail: {type: 'string', defaultsTo: function(){
          "use strict";

          return uuid.v4();

      }},

    passports : { collection: 'Passport', via: 'user' }
  }








};

