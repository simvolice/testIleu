/**
 * Created by Moon on 12.07.2015.
 */


var undescore = require('underscore');



var ProcessController = {










  fromsocketstart: function(req, res, next){

//Чтобы показывать таблицу







    NameProcess.findOne({id: req.param('id')}).exec(function (err, nameprocess) {




      var forSaveTable = '';




      var SendClientTable = {};





     nameprocess.headerTablewithoutHtml.forEach(function(item){


        forSaveTable +=  '<div class="form-group form-md-line-input form-md-floating-label"><input name="id" type="hidden" value="'+ nameprocess.id  +'"><input type="text" name="value[]" class="form-control" id="form_control_1"><input type="hidden" name="namecol[]" value="'+ item +'"><label for="form_control_1">'+ item +'</label><span class="help-block">Введите новое значение для колонки: ' + item + '</span> </div>'

    });






      SendClientTable = {

        th: nameprocess.headerTable,
        input: forSaveTable,
        primarydoc: nameprocess.primarydoc,
        connectprocess: nameprocess.connectprocess


      };


    res.send(SendClientTable);




          });

  },





  startProcess: function (req, res, next) {
    "use strict";




    User.findOne({id: req.user.id}).exec(function(err, user){

      Company.findOne({employees: user.id}).exec(function(err, company) {

         TypeProcess.find({company: company.id}).exec(function(err, typeprocess) {


          NameProcess.find({typeProcess: undescore.pluck(typeprocess, 'id')}).exec(function (err, nameprocess) {

            User.find({id: company.employees}).exec(function(err, employees){




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














              res.view('startprocess', {typeprocess: typeprocess, employees: employees, nameprocess: getTypeProcessforChainingList });





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
            Process.create({

              dprocess: [],
              company: company.id,
              type: req.body.type,
              name: req.body.name,

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

              if (!undescore.isUndefined(req.body.headertable)){



              CatalogForProcess.findOne({nameProcess: req.body.name}).exec(function(err, ctlforprocess){



                if (ctlforprocess == null){

                  CatalogForProcess.create({company: company.id, nameProcess: req.body.name, headerTable: req.body.headertable, rowTable: []}).exec(function(err, ctl){


                    ctl.rowTable.push(req.body.rowfromtable);
                    ctl.save(function(err){});

                  })



                } else {

                  ctlforprocess.rowTable.push(req.body.rowfromtable);
                  ctlforprocess.save(function(err){});



                }


              });



            }









              //Сохраняем в исходящих
              User.findOne({id: req.user.id}).exec(function(err, iniciator){






                iniciator.outProcess.push(process.id);



                iniciator.save(function (err) {});





//Сохраняем во входящих исполнителя
                  User.find({id: req.body.performer}).exec(function(err, performer){




                    performer.forEach(function(item){





                      item.inProcess.push(process.id);

                    item.roleInProcess = 'performer';



                      item.save(function (err) {});



                    });







                    //TODO сделать условие на текущего пользователя
//Сохраняем во входящих ответственного
                    User.find({id: req.body.answerable}).exec(function(err, answerable){




                      answerable.forEach(function(item){




                        item.inProcess.push(process.id);

                        item.roleInProcess = 'answer';



                        item.save(function (err) {});



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
