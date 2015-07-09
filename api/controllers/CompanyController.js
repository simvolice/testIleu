/**
 * Created by Moon on 05.07.2015.
 */

var fs = require('fs'),
  gm = require('gm');

var CompanyController = {




  createFirm: function(req, res, next){
    "use strict";




    fs.mkdir('C:/public/uploads/'+ req.user.username +'/company/'+ req.body.name,function(err){

      sails.log(err);

    });


    req.file('logo').upload({maxBytes: 1000000},function (err, uploadedFiles){


      if (err)  return res.serverError('Лого должен быть картинкой JPEG или PNG, и не больше 1 Мб');

      if (uploadedFiles[0] == null) return res.serverError('Лого должен быть картинкой JPEG или PNG, и не больше 1 Мб');



      gm(uploadedFiles[0].fd)
        .identify(function (err, data) {




          if (data.format == 'JPEG' || data.format == 'PNG') {

            gm(uploadedFiles[0].fd)
              .resize(240, 240)
              .noProfile()
              .write('C:/public/uploads/'+ req.user.username +'/company/'+ req.body.name +'/logo.'+ data.format.toLowerCase(), function(err){

                if (err) throw  err;


                Company.create({
                  user: req.user.id,
                  name: req.body.name,
                  bin: req.body.bin,
                  logo: 'C:/public/uploads/'+ req.user.username +'/company/'+ req.body.name +'/logo.'+ data.format.toLowerCase(),
                  position: req.body.position



                },function(err, result){


                  if (err){

                    return res.serverError(err);

                  }



                  User.update({id: req.user.id}, {role: 'admin'})
                    .exec(function (err, users) {


                      return res.redirect('/');

                    });




                });




              });
          }

          else {

            return res.serverError('Лого должен быть картинкой JPEG или PNG, и не больше 1 Мб');



          };





        });



    });




  }


};






module.exports = CompanyController;
