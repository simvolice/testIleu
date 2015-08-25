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







  },



  yesreq: function(req, res, next){


    var param = req.params.all();







    Company.findOne({user: req.user.id}).exec(function(err, company){




      //Проверка на уже имеющегося сотрдуника

      company.employees.push(param.fromreq);
      company.save(function(err){});


      Notif.update({id: param.notifid}, {labelforemployees: false, read:true}).exec(function(err, notif){


      Notif.create({user: param.fromreq, text: 'Вы успешно добавлены в компанию: ' + company.name + ' Поздравляем!!!'}).exec(function(err, yesnotif){

        User.findOne({id: param.fromreq}).exec(function(err, fromrequser){






        sails.sockets.emit(fromrequser.socketid, 'privateNotif', {from: req.user.id, msg: yesnotif.text, datetime: yesnotif.date});

        res.send('ok');










      });

      });

      });








    })




  },



  noreq: function(req, res, next){


    var param = req.params.all();


    Company.findOne({user: req.user.id}).exec(function(err, company){

    Notif.update({id: param.notifid}, {labelforemployees: false, read: true}).exec(function(err, notif){


      Notif.create({user: param.fromreq, text: 'Вам отказано от компании: ' + company.name + ' Мы сожалеем!!!'}).exec(function(err, yesnotif){

        User.findOne({id: param.fromreq}).exec(function(err, fromrequser){






          sails.sockets.emit(fromrequser.socketid, 'privateNotif', {warning: true ,from: req.user.id, msg: yesnotif.text, datetime: yesnotif.date});

          res.send('ok');








        });

        });

      });

    });













  }






};



module.exports = NotifController;
