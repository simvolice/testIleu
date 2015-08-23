/**
 * Created by Moon on 23.08.2015.
 */



var NotifController = {






  view: function(req, res, next){


    Notif.find({user: req.user.id}).exec(function(err, notif){



      res.view('allnotif', {notif: notif});






    });





      },

  getAllNotif: function(req, res, next){



    Notif.find({user: req.user.id}).exec(function(err, notif){





      res.send(notif);





    })






},


  sendtoread: function(req, res, next){


    var param = req.params.all();



    if (param.notifid == 'all'){

      Notif.update({}, {read: true}).exec(function(err, notif){


        res.send('ok');



      });




    }else {



      Notif.update({id: param.notifid }, {read: true}).exec(function(err, notif){



        res.send('ok');



      });






    }







  }






};



module.exports = NotifController;
