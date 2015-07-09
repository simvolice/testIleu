/**
 * Created by Moon on 01.07.2015.
 */

var fs = require('fs'),
gm = require('gm');


var ProfileController = {



  view: function (req, res, next){
    "use strict";

    //Нужен новый сервис сразу, пока накидка в вид


    fs.readFile('C:/Users/Moon/Desktop/testIleu/config/locales/citys.txt', 'utf-8', function (err, data) {



      if (err) {

       return res.serverError();

      };


      var array = data.toString().split("\n");



      array.pop();

      res.view('profileaccount', {citys: array});



    });








  },



  uploadfile: function(req, res, next){
    "use strict";



    req.file('avatar').upload({maxBytes: 1000000},function (err, uploadedFiles){


      if (err)  return res.serverError('Аватар должен быть картинкой JPEG или PNG, и не больше 1 Мб');

      if (uploadedFiles[0] == null) return res.serverError('Аватар должен быть картинкой JPEG или PNG, и не больше 1 Мб');



      gm(uploadedFiles[0].fd)
        .identify(function (err, data) {




          if (data.format == 'JPEG' || data.format == 'PNG') {

           gm(uploadedFiles[0].fd)
             .resize(240, 240)
             .noProfile()
             .write('C:/public/uploads/'+req.user.username+'/avatar.'+ data.format.toLowerCase(), function(err){

               if (err) throw  err;

               User.update({id: req.user.id}, {avatar: 'C:/public/uploads/'+req.user.username+'/avatar.'+ data.format.toLowerCase()}).
                 exec(function(err, user){


                   if (err){

                     return res.serverError(err);

                   }

                 });




             });
         }

        else {

         return res.serverError('Аватар должен быть картинкой JPEG или PNG, и не больше 1 Мб');



        };


      return res.redirect('/profile');


    });

        });

  },


  profedit: function(req, res, next){
    "use strict";


    //Нужен новый сервис сразу, пока накидка сразу в модель




    User.update({id: req.user.id},{firstname: req.body.firstname, lastname: req.body.lastname, city:  req.body.city, datebirth: req.body.datebirth, gender: req.body.gender, hobby: req.body.hobby  })
      .exec(function (err, users) {

        if(err){

          return res.badRequest(err);

        }



        return res.redirect('/');


      });






  },



  resetpsw: function(req, res, next){
    "use strict";



    Passport.update({user: req.user.id}, {password: req.body.psw})
      .exec(function (err, users) {





        return res.redirect('/profile');





      });




  }










};



module.exports = ProfileController;