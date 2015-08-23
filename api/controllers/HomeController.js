/**
 * Created by Moon on 23.08.2015.
 */



var HomeController = {





  homeview: function(req, res, next){



    Company.find({}).exec(function(err, company){



      res.view('homepage', {company: company});


    });






  },







  senreqtocompany: function(req, res, next){




    var param = req.params.all();

    var socketId = sails.sockets.id(req.socket);


    Company.findOne({id: param.companyid}).exec(function(err, company){


      User.findOne({id: company.user}).exec(function(err, user){

        User.findOne({id: req.user.id}).exec(function(err, userfromreq){


        Notif.create({user: user.id, text: 'Вам поступил новый запрос на вступление в компанию от пользователя: ' + userfromreq.firstname + ' ' +userfromreq.lastname}).exec(function(err, notif){








          sails.sockets.emit(socketId, 'privateNotif', {from: req.user.id, msg: notif.text, datetime: notif.date});


          res.send('ok');





        });
        })




      })





    })



  }







};


module.exports = HomeController;
