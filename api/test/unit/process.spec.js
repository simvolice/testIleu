/**
 * Created by Moon on 26.06.2015.
 */

require("sails-test-helper");
var moment = require('moment');



describe(TEST_NAME, function() {
  describe(".create()", function() {
    it("should be successful", function(done) {
      Process.create({

        name: 'Демо процесс',

        type: 'Бухгалтерия',

        dueDateTime: moment().format(),

        performer: ['id', 'id'],

        matching: ['id', 'id'],

        text: 'Hello',

        files: ['pathToFiles', 'pathToFiles'],


       label: 'Исходящий',








      }).exec(function(err, record) {
        expect(err).to.not.exist;
        expect(record).to.exist;
        done();
      });
    });
  });
});
