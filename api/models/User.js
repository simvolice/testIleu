
module.exports = {


  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
      verificatedEmail: {type: 'boolean', defaultsTo: false},

    passports : { collection: 'Passport', via: 'user' }
  }








};

