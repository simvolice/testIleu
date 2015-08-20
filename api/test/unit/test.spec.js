/**
 * Created by Moon on 26.06.2015.
 */

require("sails-test-helper");


var undescore = require('underscore');


describe(TEST_NAME, function() {
  describe(".create()", function() {
    it("should be successful", function(done) {




        User.findOne({id: '55c71d15a6817fc81727f49c'}).exec(function(err, user){

            Company.findOne({employees: user.id}).exec(function(err, company) {

                TypeProcess.findOne({company: company.id}).exec(function(err, typeprocess) {


                    NameProcess.find({typeProcess: typeprocess.id}).exec(function (err, nameprocess) {


                        var obj = {};


                        nameprocess.forEach(function(item){


                             item.name.forEach(function(item2){


                               obj =  item2.nameCollwithValue;



                            });



                        });





                        console.log(obj);

                        done();












                    });});});});


    });
  });


});
