/**
 * Created by Moon on 26.06.2015.
 */

require("sails-test-helper");


var unoconv = require('unoconv2');


describe(TEST_NAME, function() {
  describe(".create()", function() {
    it("should be successful", function(done) {





     var res = unoconv.convert('C:/Users/Moon/Downloads/Счет-фактура-образец-заполнения (1).xls', 'html', {


       bin: 'C:/Program Files (x86)/LibreOffice 5/program/python.exe C:/unoconv/unoconv'

     } , function (err, result) {
        // result is returned as a Buffer
        fs.writeFile('converted.html', result);



      });




          console.log(res);


          done();
















    });
  });


});
