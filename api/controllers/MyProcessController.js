/**
 * Created by Moon on 30.07.2015.
 */


var undescore = require('underscore');


var MyProcessController = {



  view: function(req, res, next){


    User.findOne({id: req.user.id}).exec(function(err, user){
    Company.findOne({employees: user.id}).exec(function(err, company){
      Process.find({id: undescore.union(user.outProcess, user.inProcess)}).exec(function(err, process){





        res.view('myprocess', {process: process });








      });









    });









    });














  },



  processview: function(req, res, next){


    User.findOne({id: req.user.id}).exec(function(err, user){


      Company.findOne({employees: user.id}).exec(function(err, company){

          TypeProcess.find({company: company.id}).exec(function(err, typeprocess) {


            NameProcess.find({typeProcess: undescore.pluck(typeprocess, 'id')}).exec(function (err, nameprocess) {


        Process.findOne({url: sails.getBaseurl() + '/processlist?id=' + req.query.id}).exec(function(err, process) {


          User.find({id: undescore.pluck(process.answerable, 'valueID')}).exec(function(err, useranswerable){


            User.find({id: company.employees}).exec(function(err, employees){


Comments.find({process: process.id}).exec(function(err, comments){

  CatalogForProcess.find({}).exec(function(err, catalogforprocess){



    var forChaining = {};

    var getTypeProcessforChainingList = [];



    typeprocess.forEach(function(item){





      undescore.where(nameprocess, {typeProcess: item.id}).forEach(function(name){





        forChaining = {

          id : item.id,

          name: name.name,
          idname: name.id

        };



        getTypeProcessforChainingList.push(forChaining);


      });



    });





    var arrHeader = [];
    var disabledButton = '';


    catalogforprocess.forEach(function(item){

      process.connectprocess.forEach(function(item2){


        if (item.nameProcess == item2){


          arrHeader.push(item);



        }

      });
    });







  res.view('processview', { typeprocess: typeprocess, employees: employees, nameprocess: getTypeProcessforChainingList, gridVal: arrHeader ,comments: comments ,process: process, roleInProcess: user.roleInProcess});




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








  performerwork: function(req, res, next){


    var action = req.param('action');


    if (action === 'endprocess') {




      User.findOne({id: req.user.id}).exec(function(err, user){
        Company.findOne({employees: user.id}).exec(function(err, company){
          Process.findOne({id: req.body.id}).exec(function(err, process){


            process.status = 'Ответственный взял на работу';


            process.save(function(err){});



            User.find({id: undescore.pluck(process.answerable, 'valueID')}).exec(function(err, useransw){





              useransw.forEach(function(itemansw){


                itemansw.roleInProcess = 'answer';



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

            Notif.create({user: process.initiator.id, text: 'Вам отправлен процесс на доработку ' + '<a href="' + process.url + '">Перейти к процессу</a>'}).exec(function(err, newprocess) {


              User.findOne({id: process.initiator.id}).exec(function(err, iniciator){



              sails.sockets.emit(iniciator.socketid, 'privateNotif', {from: req.user.id, msg: newprocess.text, datetime: newprocess.date});


            });
            });


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
          Process.update({id: req.body.id}, {status: 'Закончен положительно', archive: true}).exec(function(err, process) {



         res.redirect('/myprocess');




   });
        });
      });
          }else if(action === 'minus'){


      User.findOne({id: req.user.id}).exec(function(err, user){
        Company.findOne({employees: user.id}).exec(function(err, company){
          Process.update({id: req.body.id}, {status: 'Закончен отрицательно', archive: true}).exec(function(err, process) {



            res.redirect('/myprocess');




          });
        });
      });


    }else if (action === 'rework'){


      User.findOne({id: req.user.id}).exec(function(err, user){
        Company.findOne({emploees: user.id}).exec(function(err, company){
          Process.update({id: req.body.id}, {dueDateTime: req.body.newdate, status: 'Отправлен на доработку'}).exec(function(err, process){



            process.performer.forEach(function(item){


              Notif.create({user: item.valueID, text: 'Вам отправлен процесс на доработку ' + '<a href="' + process.url + '">Перейти к процессу</a>'}).exec(function(err, newprocess) {


                User.findOne({id: item.valueID}).exec(function(err, performer){



                  sails.sockets.emit(performer.socketid, 'privateNotif', {from: req.user.id, msg: newprocess.text, datetime: newprocess.date});


                });
              });


            });






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
        uri: 'mongodb://localhost:27017/ileu.primarydoc',
        id: req.user.id
      }, function whenDone(err, uploadedFiles) {

        if (err) return res.negotiate(err);





        var arrPrimaryDoc = [];
        var primarydoc = '';
        var arrConnectProcess = [];

        var connectProcess = '';



        if (undescore.isUndefined(req.body.primarydoc)){

          primarydoc = null;

        }else{


          arrPrimaryDoc = req.body.primarydoc.split(',');

        }if (undescore.isUndefined(req.body.connectprocess)){


          connectProcess = null;


        }else{

          arrConnectProcess = req.body.connectprocess.split(',');

        }



        var objPerformer = {};
        var objAnswering = {};



        User.find({id: req.body.performer}).exec(function(err, userm){


          var nameWithID = userm.map(function(item){




            return objPerformer = {

              nameUser: item.displayname,
              valueID: item.id






            }




          });



          User.find({id: req.body.answerable}).exec(function(err, useran){


            var nameWithIDAnswer = useran.map(function(item){




              return objAnswering = {

                nameUser: item.displayname,
                valueID: item.id




              };


            });













            User.findOne({id: req.user.id}).exec(function(err, user){
              Company.findOne({employees: user.id}).exec(function(err, company){
                NameProcess.findOne({id: req.body.name}).exec(function(err, nameprocess){



                  Process.create({

                    dprocess: [],
                    company: company.id,
                    type: req.body.type,
                    name: {

                      id: nameprocess.id,
                      name: nameprocess.name

                    },

                    initiator: {

                      nameUser: user.displayname,
                      valueID: user.id
                    },

                    dueDateTime: req.body.datetime,
                    text: req.body.content,


                    performer: nameWithID, //TODO Нужно сделать проверки на единственный элемент


                    answerable: nameWithIDAnswer,

                    documents: arrPrimaryDoc || primarydoc,

                    connectprocess: arrConnectProcess || connectProcess,

                    files: undescore.pluck(uploadedFiles, 'fd')



                  }).exec(function(err, process){



                    Process.findOne({id: req.body.id}).exec(function(err, processd){


                      processd.dprocess.push(process.id);

                      processd.save(function(err){});

                    });


                    User.findOne({id: req.user.id}).exec(function(err, iniciator){



                      iniciator.outProcess.push(process.id);


                      if (undescore.isEqual(req.body.performer, iniciator.id) || undescore.contains(req.body.performer, iniciator.id) ){



                        iniciator.inProcess.push(process.id);


                        iniciator.roleInProcess = "performer";

                        iniciator.save(function (err) {});


                        Notif.create({user: iniciator.id, text: 'Вам назначен новый процесс, перейдите по ссылке для просмотра ' + '<a href="' + process.url + '">Перейти к процессу</a>'}).exec(function(err, newprocess) {





                        });



                      }else {


                        userm.forEach(function(item){



                          item.inProcess.push(process.id);


                          item.roleInProcess = "performer";

                          item.save(function (err) {});


                          Notif.create({user: item.id, text: 'Вам назначен новый процесс, перейдите по ссылке для просмотра ' + '<a href="' + process.url + '">Перейти к процессу</a>'}).exec(function(err, newprocess) {



                            sails.sockets.emit(item.socketid, 'privateNotif', {from: req.user.id, msg: newprocess.text, datetime: newprocess.date});



                          });


                        });





                      }






                      iniciator.save(function (err) {});


                    });























                    if (!undescore.isUndefined(req.body.headertable)){



                      CatalogForProcess.findOne({nameProcess: nameprocess.name}).exec(function(err, ctlforprocess){



                        if (ctlforprocess == null){

                          CatalogForProcess.create({company: company.id, nameProcess: nameprocess.name, headerTable: req.body.headertable, rowTable: []}).exec(function(err, ctl){


                            ctl.rowTable.push(req.body.rowfromtable);
                            ctl.save(function(err){});

                          })



                        } else {

                          ctlforprocess.rowTable.push(req.body.rowfromtable);
                          ctlforprocess.save(function(err){});



                        }


                      });



                    }


















                  });







                });
              });
            });




          })




        });




        return res.redirect('/myprocess');


      })



































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
