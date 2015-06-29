/**
 * Created by Moon on 26.06.2015.
 */

require("sails-test-helper");
  var mailSend = require('../../services/mail');



describe(TEST_NAME, function(){
    "use strict";


    it('return err or Its OK', function(){







       mailSend.sendMail('emailReg', 'simvolice@gmail.com', 'Подтвержение регистрации');



    });











});