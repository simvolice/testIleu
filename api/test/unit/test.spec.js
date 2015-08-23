/**
 * Created by Moon on 26.06.2015.
 */

require("sails-test-helper");


var undescore = require('underscore');


describe(TEST_NAME, function() {
  describe(".create()", function() {
    it("should be successful", function(done) {




     Process.find({}).exec(function(err, process){





       var arrFind = ['Служебка666 55c9fab09b9465f0208daf81', 'simvolice 55c9fab09b9465f0208daf81'];



       var arrHeader = [];

       var arrVal = [];

       var arr = [];

       var obj = {};


       var arrNew = [];

       process.forEach(function(item){

         arrFind.forEach(function(item2){


         if (item.name == item2){


           arr.push(item.catalogs.th);








         }

       })

       });





      var arrUniqui = undescore.uniq(arr);














       console.log(arrN);
       done();




     })





    });
  });


});
