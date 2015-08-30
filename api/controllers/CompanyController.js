/**
 * Created by Moon on 05.07.2015.
 */

var fs = require('fs'),
  gm = require('gm');

var CompanyController = {




  createFirm: function(req, res, next){
    "use strict";






    fs.mkdir(process.cwd() + '/.tmp/public/driver/' + req.user.email +'/company/'+ req.body.name,function(err){



    });


    req.file('logo').upload({maxBytes: 1000000},function (err, uploadedFiles) {


      if (uploadedFiles[0] != null) {


      gm(uploadedFiles[0].fd)
        .identify(function (err, data) {


          if (data.format == 'JPEG' || data.format == 'PNG') {

            gm(uploadedFiles[0].fd)
              .resize(240, 240)
              .noProfile()
              .write(process.cwd() + '/.tmp/public/driver/' + req.user.email + '/company/' + req.body.name + '/logo.' + data.format.toLowerCase(), function (err) {

                if (err) throw  err;


                Company.create({
                  user: req.user.id,
                  name: req.body.name,
                  bin: req.body.bin,
                  logo: 'driver/' + req.user.email + '/company/' + req.body.name + '/logo.' + data.format.toLowerCase(),
                  employees: req.user.id


                }, function (err, result) {


                  TypeProcess.create({company: result.id}).exec(function (err, cat) {
                  });

                  if (err) {

                    return res.serverError(err);

                  }


                  if (req.body.position != null) {


                    User.update({id: req.user.id}, {role: 'admin', position: req.body.position, companyYes: true})
                      .exec(function (err, users) {


                        return res.redirect('/');

                      });

                  } else {


                    User.update({id: req.user.id}, {role: 'admin', position: 'Основатель компании', companyYes: true})
                      .exec(function (err, users) {


                        return res.redirect('/');

                      });

                  }


                });


              });
          } else {

            return res.serverError('Аватар должен быть картинкой JPEG или PNG, и не больше 1 Мб');


          }
          ;


        });

    }else {





        Company.create({
          user: req.user.id,
          name: req.body.name,
          bin: req.body.bin,
          logo: 'noavatar.jpg',
          employees: req.user.id


        }, function (err, result) {


          TypeProcess.create({company: result.id}).exec(function (err, cat) {
          });

          if (err) {

            return res.serverError(err);

          }


          if (req.body.position != null) {


            User.update({id: req.user.id}, {role: 'admin', position: req.body.position, companyYes: true})
              .exec(function (err, users) {


                return res.redirect('/');

              });

          } else {


            User.update({id: req.user.id}, {role: 'admin', position: 'Основатель компании', companyYes: true})
              .exec(function (err, users) {


                return res.redirect('/');

              });

          }


        });











      }

        });




    }


  };





module.exports = CompanyController;
