/**
 * Created by Moon on 12.07.2015.
 */


var undescore = require('underscore');

var fs = require('fs');
var path = require('path');



var ProcessController = {


  startProcess: function (req, res, next) {
    "use strict";




    User.findOne({id: req.user.id}).exec(function(err, user){

      Company.findOne({user: user.id}).exec(function(err, company) {

         TypeProcess.findOne({company: company.id}).exec(function(err, typeprocess) {


          NameProcess.find({typeProcess: typeprocess.id}).exec(function (err, nameprocess) {

            User.find({id: company.employees}).exec(function(err, user2){






            var obj = {};




            var ret =  nameprocess.map(function(item3, key3){




              return item3.name.map(function(item2, key2){




                obj = {

                  name: item3.nameType.replace(/\s+/g, ''),

                  value: item2



                };


                return obj;


              });




            });





            var nameType =  nameprocess.map(function(item){


             return item.nameType;


            });












            var arrFile = [];

           fs.readdir('C:/Users/Moon/Desktop/testIleu/views/doc', function(err, files){




            files.forEach(function(item){


             var withoutExt = path.basename(item, '.handlebars');


              arrFile.push(withoutExt);

            })



            });








            res.view('startprocess', {type: nameType,  nameProcess: undescore.flatten(ret), employees: user2, docs: arrFile, id: company.employees });





          });
      });

    });
      });
    });


  },






  processSave: function(req, res, next){





    req.file('document')
      .upload({
        adapter: require('skipper-gridfs'),
        uri: 'mongodb://localhost:27017/ileu4.primarydoc',
        id: req.user.id
      }, function whenDone(err, uploadedFiles) {

        if (err) return res.negotiate(err);






        var objMatching = {};
       var objAnswering = {};










    User.find({id: req.body.matching}).exec(function(err, userm){


     var nameWithID = userm.map(function(item){

        if (item.firstname != null && item.lastname != null) {


         return objMatching = {

            nameUser: item.firstname + ' ' + item.lastname,
            valueID: item.id




          };

        }else {


         return  objMatching = {

            nameUser: item.username,
            valueID: item.id




          };




        }




      });



      User.find({id: req.body.matching}).exec(function(err, useran){


        var nameWithIDAnswer = useran.map(function(item){

          if (item.firstname != null && item.lastname != null) {


            return objAnswering = {

              nameUser: item.firstname + ' ' + item.lastname,
              valueID: item.id




            };

          }else {


            return  objAnswering = {

              nameUser: item.username,
              valueID: item.id




            };




          }




        });






        User.findOne({id: req.user.id}).exec(function(err, user){
          Company.findOne({user: user.id}).exec(function(err, company){
            Process.create({

              company: company.id,
              type: req.body.type,
              name: req.body.name,
              initiator: req.user.id,
              dueDateTime: req.body.datetime,
              text: req.body.content,


              matching: nameWithID, //TODO Нужно сделать проверки на единственный элемент
              answerable: nameWithIDAnswer,

              documents: req.body.primarydoc,

              files: undescore.pluck(uploadedFiles, 'filename')



            }).exec(function(err, process){


              if (err) return res.serverError(err);








              User.findOne({id: req.user.id}).exec(function(err, user2){




                if (err) return res.serverError(err);

                user2.outProcess.push(process.id);

                user2.save(function (err) {



                  if (err) return res.serverError(err);


                  User.find({id: undescore.union(req.body.matching, req.body.answerable)}).exec(function(err, user3){




                  user3.map(function(item){



                      item.inProcess.push(process.id);




                      item.save(function (err) {





                      });



                    });




                   return res.redirect('/startprocess');




                  });




                });


              });


            });

          });




            })




          })







        })

      });














  }












};



module.exports = ProcessController;
