/**
 * Created by Moon on 13.07.2015.
 */

var fs = require('fs');
var path = require('path');
var undescore = require('underscore');


var TypeController = {


  typeview: function (req, res, next){







    User.findOne({id: req.user.id}).exec(function(err, user){

       Company.findOne({employees: user.id}).exec(function(err, company){

           TypeProcess.find({company: company.id}).exec(function(err, typeprocess){





              NameProcess.find({typeProcess: undescore.pluck(typeprocess, 'id')}).exec(function(err, nameprocess){













            var forNestable = {};





                typeprocess.forEach(function(key, item){




                  forNestable[item] = {

                    id: key.id,
                    nameType: key.nameType,
                    name: undescore.pluck(undescore.where(nameprocess, {typeProcess: key.id}), 'name')


                  };

                });





















                var arrFile = [];

                fs.readdir(process.cwd() + '/views/doc/', function(err, files){


                  files.forEach(function(item){


                    var withoutExt = path.basename(item, '.handlebars');


                    arrFile.push(withoutExt);

                  })



                });














            res.view('typeview', {typeprocess: forNestable, docs: arrFile});
















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


          company.nameprocessYes = true;
          company.save(function(err){});

          User.find({id: company.employees}).exec(function(err, manyuser){

            manyuser.forEach(function(item){

              item.nameprocessYes = true;
              item.save(function(err){});



            });


          });


          TypeProcess.create({company: company.id, nameType: req.body.typeprocess}).exec(function(err, typeprocess){



           var objForHeaderTable = '';

            req.body.mycol.forEach(function(item){



             objForHeaderTable += '<th>'+ item +'</th>'


            });






            var connectprocess = [];

            var primarydoc = [];



           if ( undescore.isArray(req.body.primarydoc)){


             req.body.primarydoc.forEach(function(item){


               primarydoc.push(item);



             });

           }else {


             primarydoc.push(req.body.primarydoc);

           }



            if (undescore.isArray(req.body.connectprocess)){


              req.body.connectprocess.forEach(function(item){


                connectprocess.push(item);

              });


            }else{


              connectprocess.push(req.body.connectprocess);

            }












            NameProcess.create({typeProcess: typeprocess.id, name: req.body.nameprocess, headerTable: objForHeaderTable, primarydoc: primarydoc, connectprocess: connectprocess, headerTablewithoutHtml: req.body.mycol}).exec(function(err, nameprocess){





             res.redirect('/typeview');





            })




          })


        })
      })


    }if (action === 'createname'){




      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({employees: user.id}).exec(function(err, company){

          TypeProcess.findOne({company: company.id, nameType: req.body.typeprocess}).exec(function(err, typeprocess){


            var objForHeaderTable = '';

            req.body.mycol.forEach(function(item){



              objForHeaderTable += '<th>'+ item +'</th>'


            });






            var connectprocess = [];

            var primarydoc = [];



            if ( undescore.isArray(req.body.primarydoc)){


              req.body.primarydoc.forEach(function(item){


                primarydoc.push(item);



              });

            }else {


              primarydoc.push(req.body.primarydoc);

            }



            if (undescore.isArray(req.body.connectprocess)){


              req.body.connectprocess.forEach(function(item){


                connectprocess.push(item);

              });


            }else{


              connectprocess.push(req.body.connectprocess);

            }












            NameProcess.create({typeProcess: typeprocess.id, name: req.body.nameprocess, headerTable: objForHeaderTable, primarydoc: primarydoc, connectprocess: connectprocess, headerTablewithoutHtml: req.body.mycol}).exec(function(err, nameprocess){





              res.redirect('/typeview');





            })






          })




          })


        })




    }if(action === 'delete'){

      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({employees: user.id}).exec(function(err, company){

          TypeProcess.destroy({company: company.id, id: req.body.process}).exec(function(err, typeprocess){




            NameProcess.destroy({typeProcess: req.body.process}).exec(function(err, nameprocess){


              res.redirect('/typeview');





            })




          })


        })
      })



    }











  }












};



module.exports = TypeController;
