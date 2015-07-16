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











  }






};



module.exports = KontraController;
