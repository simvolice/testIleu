/**
 * Created by Moon on 16.07.2015.
 */




var KontraController = {


  view: function(req, res, next){



    User.findOne({id: req.user.id}).exec(function(err, user){

      Company.findOne({user: user.id}).exec(function(err, company){

        Kontragents.find({company: company.id}).exec(function(err, kontra){



            res.view('kontragent', {kontra: kontra});


          })
        })


      })











  },




  kontraAction: function(req, res, next){

    var action = req.param('action');




    if (action === 'create'){




      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({user: user.id}).exec(function(err, company){

          Kontragents.create({company: company.id, name: req.body.name, typeKontra: req.body.type, fio: req.body.fio}).exec(function(err, typeprocess){




            res.redirect('/kontraview');



          })


        })
      })





    }if (action === 'update'){



      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({user: user.id}).exec(function(err, company){

          Kontragents.update({name: req.body.kontra}, {name: req.body.name, typeKontra: req.body.type, fio: req.body.fio}).exec(function(err, typeprocess){




            res.redirect('/kontraview');



          })


        })
      })






    } if (action === 'delete') {




      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({user: user.id}).exec(function(err, company){

          Kontragents.destroy({name: req.body.name}).exec(function(err, typeprocess){




            res.redirect('/kontraview');



          })


        })
      })







    }



  }



};



module.exports = KontraController;
