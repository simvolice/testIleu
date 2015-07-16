/**
 * Created by Moon on 26.06.2015.
 */

require("sails-test-helper");
var moment = require('moment');


describe(TEST_NAME, function() {
  describe(".create()", function() {
    it("should be successful", function(done) {







      User.findOne({id: '559286fe28733e3832bed0dd'}).exec(function(err, user){
        "use strict";





        Company.findOne({user: user.id}).exec(function(err, company){

          console.log(company.id);



          Kontragents.create({company: company.id, name: 'тоо вассс', typeKontra: 'заказчик', fio: 'всвсвсвсвс'}).exec(function(err, kontra){




              console.log(kontra);


              done();



          })







        })








      })














    });
  });
});
