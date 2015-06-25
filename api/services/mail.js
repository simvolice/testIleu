/**
 * Created by Moon on 25.06.2015.
 */
var mailcfg = require('../../config/mailCfg').mailCfg;


exports.sendMail = function(pathTemplate, to, subject ) {



    sails.config.hooks['sails-hook-email'] = {

        service: mailcfg.connectSMTP.service,

        host: mailcfg.connectSMTP.host,


        auth: {user:mailcfg.connectSMTP.userName, pass:mailcfg.connectSMTP.password}



    };




    sails.hooks.email.send(
        pathTemplate,
        {

            senderName: "ILEU"
        },
        {

            to: to,
            subject: subject
        },


        function(err) {


            console.log(err || "It worked!");



        }
    );















};


