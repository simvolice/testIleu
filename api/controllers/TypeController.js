/**
 * Created by Moon on 13.07.2015.
 */

var fs = require('fs');
var path = require('path');
var undescore = require('underscore');


var TypeController = {


  typeview: function (req, res, next){
    "use strict";






    User.findOne({id: req.user.id}).exec(function(err, user){

       Company.findOne({employees: user.id}).exec(function(err, company){

           TypeProcess.findOne({company: company.id}).exec(function(err, typeprocess){


              NameProcess.find({typeProcess: typeprocess.id}).exec(function(err, nameprocess){






              var  namePr = [];

                nameprocess.forEach(function(item){


                  item.name.forEach(function(item2){


                    namePr.push(item2.name);


                  })



                });



            var providers = {};

            Object.keys(nameprocess).forEach(function (key) {


              providers[key] = {



                id: nameprocess[key].id,


                nameType: nameprocess[key].nameType
                , name: nameprocess[key].name


              };



            });



                var arrFile = [];

                fs.readdir('C:/Users/Moon/Desktop/testIleu/views/doc', function(err, files){




                  files.forEach(function(item){


                    var withoutExt = path.basename(item, '.handlebars');


                    arrFile.push(withoutExt);

                  })



                });













            res.view('typeview', {mass: providers, docs: arrFile, name: namePr});
















          })
  })


      })
  })


  },



  typeProcess: function (req, res, next){

    var action = req.param('action');




    if (action === 'create'){

      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({employees: user.id}).exec(function(err, company){

          TypeProcess.findOne({company: company.id}).exec(function(err, typeprocess){


            //Создание с нуля, каталога с названиями колонок

            var obj = {};

            var arr = req.body.mycol;


            arr.forEach(function(item, key){


              obj[key] = {


                col: item,
                value: []



              }



            });



            var nameObj = {};


            nameObj = {


              name: req.body.name,
              nameCollwithValue: obj,
              primarydoc: req.body.primarydoc,
              dprocess:req.body.dprocess


            };



            NameProcess.create({typeProcess: typeprocess.id, nameType: req.body.process, name: []}).exec(function(err, nameprocess){


              NameProcess.findOne({id: nameprocess.id}).exec(function(err, result){

                result.name.push(nameObj);
                result.save(function(err){});

              });


             res.redirect('/typeview');





            })




          })


        })
      })


    }if (action === 'createname'){




      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({employees: user.id}).exec(function(err, company){

          TypeProcess.findOne({company: company.id}).exec(function(err, typeprocess){


            NameProcess.findOne({nameType: req.body.process}).exec(function(err, nameprocess){


              var obj = {};

              var arr = req.body.mycol;


              arr.forEach(function(item, key){


                obj[key] = {


                  col: item,
                  value: []



                }



              });



              var nameObj = {};


              nameObj = {


                name: req.body.name,
                nameCollwithValue: obj,
                primarydoc: [req.body.primarydoc],
                dprocess:[req.body.dprocess]


              };

              nameprocess.name.push(nameObj);

              nameprocess.save(function (err) {


              return  res.redirect('/typeview');


              });







            })




          })


        })
      })



    }if(action === 'delete'){

      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({employees: user.id}).exec(function(err, company){

          TypeProcess.findOne({company: company.id}).exec(function(err, typeprocess){


            NameProcess.destroy({nameType: req.body.process}).exec(function(err, nameprocess){


              res.redirect('/typeview');





            })




          })


        })
      })



    }











  }












};



module.exports = TypeController;
