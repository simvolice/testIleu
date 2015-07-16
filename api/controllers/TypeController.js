/**
 * Created by Moon on 13.07.2015.
 */




var TypeController = {


  typeview: function (req, res, next){
    "use strict";






    User.findOne({id: req.user.id}).exec(function(err, user){

       Company.findOne({user: user.id}).exec(function(err, company){

           TypeProcess.findOne({company: company.id}).exec(function(err, typeprocess){


              NameProcess.find({typeProcess: typeprocess.id}).exec(function(err, nameprocess){


            var providers = {};

            Object.keys(nameprocess).forEach(function (key) {


              providers[key] = {



                id: nameprocess[key].id,


                nameType: nameprocess[key].nameType
                , name: nameprocess[key].name


              };



            });


            res.view('typeview', {mass: providers});


          })
  })


      })
  })


  },



  typeProcess: function (req, res, next){

    var action = req.param('action');




    if (action === 'create'){

      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({user: user.id}).exec(function(err, company){

          TypeProcess.findOne({company: company.id}).exec(function(err, typeprocess){


            NameProcess.create({typeProcess: typeprocess.id, nameType: req.body.process}).exec(function(err, nameprocess){


             res.redirect('/typeview');





            })




          })


        })
      })


    }if (action === 'createname'){




      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({user: user.id}).exec(function(err, company){

          TypeProcess.findOne({company: company.id}).exec(function(err, typeprocess){


            NameProcess.findOne({nameType: req.body.process}).exec(function(err, nameprocess){



              nameprocess.name.push(req.body.nametype);

              nameprocess.save(function (err) {


                res.redirect('/typeview');


              });







            })




          })


        })
      })



    }if(action === 'delete'){

      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({user: user.id}).exec(function(err, company){

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
