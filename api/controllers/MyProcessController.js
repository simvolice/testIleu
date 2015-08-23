/**
 * Created by Moon on 30.07.2015.
 */


var undescore = require('underscore');


var MyProcessController = {



  view: function(req, res, next){


    User.findOne({id: req.user.id}).exec(function(err, user){
    Company.findOne({employees: user.id}).exec(function(err, company){
      Process.find({id: undescore.union(user.outProcess, user.inProcess)}).exec(function(err, process){







          process.forEach(function(item){



          user.outProcess.forEach(function(itemOutProcess) {

            if (item.id === itemOutProcess) {





              item.outProcess = 'Исходящий';






            }

          })
            user.inProcess.forEach(function(itemInProcess) {





            if(item.id === itemInProcess){



                item.inProcess = 'Входящий';





              }

              /*else if(item.id === userDueProcess){


               item.dueProcess = 'Просроченный';

               }*/






            })


        });













        res.view('myprocess', {process: process });








      });









    });









    });














  },



  processview: function(req, res, next){


    User.findOne({id: req.user.id}).exec(function(err, user){
      Company.findOne({employees: user.id}).exec(function(err, company){
        Process.findOne({url: sails.getBaseurl() + '/processlist?id=' + req.query.id}).exec(function(err, process) {
    User.find({id: undescore.pluck(process.answerable, 'valueID')}).exec(function(err, useransw){

        TypeProcess.findOne({company: company.id}).exec(function(err, typeprocess) {


          NameProcess.find({typeProcess: typeprocess.id}).exec(function (err, nameprocess) {

            User.find({id: company.employees}).exec(function(err, user2){

              Kontragents.find({company: company.id}).exec(function(err, kontra){

Comments.find({process: process.id}).exec(function(err, comments){

  CatalogForProcess.find({}).exec(function(err, process22){




    var findItem = ['Служебка666 55c9fab09b9465f0208daf81', 'simvolice 55c9fab09b9465f0208daf81'];




    var arrHeader = [];



    process22.forEach(function(item){

      findItem.forEach(function(item2){


        if (item.nameProcess == item2){








          arrHeader.push(item);








        }

      });



    });


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



                var documents =  nameprocess.map(function(item){


                  return item.documents;


                });









                var disabledButton = '';


            useransw.forEach(function(itemanswer){




              if (undescore.include(itemanswer.inProcess, process.id)){


                disabledButton = 'disabled';





              }else {


                disabledButton = null;

              }



            });






























  res.view('processview', {gridVal: arrHeader ,comments: comments ,process: process, name: process.name, roleInProcess: user.roleInProcess, disabled: disabledButton, type: nameType,  nameProcess: undescore.flatten(ret), employees: user2, id: company.employees, kontra: kontra, documents: undescore.flatten(documents)});


          });

});

            });

            });







          });
        });
    });





        });
      });
    });
  },




  iniciatorwork: function(req, res, next){


    var action = req.param('action');


    if (action === 'endprocess') {


      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({employees: user.id}).exec(function(err, company) {


          Process.findOne({id: req.body.id}).exec(function(err, process){


            Archive.create({

              company: process.company,

              process: process.id,

              url: process.url,

              name: process.name,

              type: process.type,

              dateTimeStart: process.dateTimeStart,

              dueDateTime: process.dueDateTime,

              initiator: user.id,

              answerable: process.answerable,

              performer: process.performer,

              text: process.text,

              files: process.files,

              documents: process.documents







            }).exec(function(err, archive){


              var indexProcess = user.outProcess.indexOf(process.id);


             user.outProcess.splice(indexProcess, 1);


              user.save(function(err){







                User.find({id: undescore.union(undescore.pluck(process.answerable, 'valueID'), undescore.pluck(process.performer, 'valueID'))}).exec(function(err, usermany){



                  usermany.forEach(function(itemusermany){



                      var indexProcessmany =  itemusermany.inProcess.indexOf(process.id);

                    itemusermany.inProcess.splice(indexProcessmany, 1);

                    itemusermany.save(function(err){});


                  });




                   Process.destroy({id: process.id}).exec(function(err){


                     res.redirect('/myprocess');


                   });








                })



              });










            })













          })













        });
        });

        }





  },



  performerwork: function(req, res, next){


    var action = req.param('action');


    if (action === 'endprocess') {




      User.findOne({id: req.user.id}).exec(function(err, user){
        Company.findOne({employees: user.id}).exec(function(err, company){
          Process.findOne({id: req.body.id}).exec(function(err, process){


            process.status = 'Ответственный взял на работу';


            process.save(function(err){});



            User.find({id: undescore.pluck(process.answerable, 'valueID')}).exec(function(err, useransw){


              sails.log(useransw);


              useransw.forEach(function(itemansw){


                itemansw.roleInProcess = 'answer';

                itemansw.inProcess.push(process.id);

                itemansw.save(function(err){});

              });




              res.redirect('/myprocess');


            });










          })













        })












      });












    }else if (action === 'rework'){


      User.findOne({id: req.user.id}).exec(function(err, user){
        Company.findOne({emploees: user.id}).exec(function(err, company){
          Process.update({id: req.body.id}, {dueDateTime: req.body.newdate, status: 'Отправлен на доработку'}).exec(function(err, process){




            res.redirect('/myprocess');





          })
    })
    })







    }




  },









  answer: function(req, res, next){


    var action = req.param('action');



    if (action === 'plus'){


      User.findOne({id: req.user.id}).exec(function(err, user){
        Company.findOne({employees: user.id}).exec(function(err, company){
          Process.update({id: req.body.id}, {status: 'Закончен положительно'}).exec(function(err, process) {



         res.redirect('/myprocess');




   });
        });
      });
          }else if(action === 'minus'){


      User.findOne({id: req.user.id}).exec(function(err, user){
        Company.findOne({employees: user.id}).exec(function(err, company){
          Process.update({id: req.body.id}, {status: 'Закончен отрицательно'}).exec(function(err, process) {



            res.redirect('/myprocess');




          });
        });
      });


    }else if (action === 'rework'){


      User.findOne({id: req.user.id}).exec(function(err, user){
        Company.findOne({emploees: user.id}).exec(function(err, company){
          Process.update({id: req.body.id}, {dueDateTime: req.body.newdate, status: 'Отправлен на доработку'}).exec(function(err, process){




            res.redirect('/myprocess');





          });
        });
      });









    }








  },










  dprocess: function(req, res, next){



    req.file('document')
      .upload({
        adapter: require('skipper-gridfs'),
        uri: 'mongodb://localhost:27017/ileu4.primarydoc',
        id: req.user.id
      }, function whenDone(err, uploadedFiles) {

        if (err) return res.negotiate(err);






        var objPerformer = {};
        var objAnswering = {};










        User.find({id: req.body.performer}).exec(function(err, userm){


          var nameWithID = userm.map(function(item){




            return objPerformer = {

              nameUser: item.firstname + ' ' + item.lastname,
              valueID: item.id






            }




          });



          User.find({id: req.body.answerable}).exec(function(err, useran){


            var nameWithIDAnswer = useran.map(function(item){




              return objAnswering = {

                nameUser: item.firstname + ' ' + item.lastname,
                valueID: item.id




              };






            });






            User.findOne({id: req.user.id}).exec(function(err, user){
              Company.findOne({employees: user.id}).exec(function(err, company){
                Process.create({


                  company: company.id,
                  type: req.body.type,
                  name: req.body.name,
                  initiator: user.firstname + ' ' + user.lastname,
                  dueDateTime: req.body.datetime,
                  text: req.body.content,


                  performer: nameWithID, //TODO Нужно сделать проверки на единственный элемент


                  answerable: nameWithIDAnswer,

                  documents: req.body.primarydoc,

                  files: undescore.pluck(uploadedFiles, 'filename')



                }).exec(function(err, process){


                  if (err) return res.serverError(err);



                  Process.findOne({id: req.body.id}).exec(function(err, processd){


                    processd.dprocess.push(process.id);

                    processd.save(function(err){});

                  });





                  User.findOne({id: req.user.id}).exec(function(err, user2){




                    if (err) return res.serverError(err);

                    user2.outProcess.push(process.id);

                    user2.save(function (err) {



                      if (err) return res.serverError(err);


                      User.find({id: req.body.performer}).exec(function(err, user3){




                        user3.map(function(item){



                          item.inProcess.push(process.id);

                          item.roleInProcess = 'performer';



                          item.save(function (err) {





                          });



                        });




                        return res.redirect('/myprocess');




                      });




                    });


                  });


                });

              });




            })




          })







        })

      });






















  },



  commentsave: function(req, res, next){




    User.findOne({id: req.user.id}).exec(function(err, user){
      Company.findOne({employees: user.id}).exec(function(err, company) {
Comments.create({process: req.body.id, author: req.user.firstname + ' ' + req.user.lastname, text: req.body.comment}).exec(function(err, comments){





  res.redirect('/myprocess');




})














      });
    });
      }









};




module.exports = MyProcessController;
