/**
 * Created by Moon on 26.06.2015.
 */

require("sails-test-helper");
var moment = require('moment');



describe(TEST_NAME, function() {
  describe(".create()", function() {
    it("should be successful", function(done) {
      Catalogs.create({

        name: {
          "Типы Процессов": [


            "Бухгалтерия",
            "Административка",
            "Юристы"




          ]
        }










      }).exec(function(err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        done();
      });
    });
  });
});
