/**
 * Created by Moon on 25.06.2015.
 */


var mailcfg = require('../../config/mailCfg').mailCfg;
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var path = require('path');
var templatesDir = path.resolve(__dirname, '../../views/', 'emailTemplates');
var emailTemplates = require('email-templates');

exports.sendMail = function(pathTemplate, uuid, to, subject, res ) {


    emailTemplates(templatesDir, function(err, template) {

        if (err) {
            console.log(err);
        } else {

            // ## Send a single email

            // Prepare nodemailer transport object
            var auth = {
                auth: {
                    api_key: mailcfg.connectMailGun.apiKey,
                    domain: mailcfg.connectMailGun.domain
                }
            };

            var nodemailerMailgun = nodemailer.createTransport(mg(auth));



          var url = sails.getBaseurl() + '/verifEmail?id=' + uuid;

            var locals = {

                url: url,
                email: to,
              uuid: uuid


            };

            // Send a single email
            template(pathTemplate, locals, function (err, html) {
                if (err) {
                    console.log(err);
                } else {
                    nodemailerMailgun.sendMail({
                        from: 'ileu@ileu.biz',
                        to: to, // An array if you have multiple recipients.
                        subject: subject,


                        html: html

                    }, function (err, info) {
                        if (err) {
                            console.log('Error: ' + err);
                        }
                        else {
                            console.log('Response: ' + info);
                        }
                    });

                }
            });


        };


    });


};


