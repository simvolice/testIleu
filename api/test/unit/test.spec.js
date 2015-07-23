/**
 * Created by Moon on 26.06.2015.
 */

require("sails-test-helper");

var uuid = require('node-uuid');
var undescore = require('underscore');
var Map = require("collections/map");


describe(TEST_NAME, function() {
  describe(".create()", function() {
    it("should be successful", function(done) {





      User.findOne({id: '559286fe28733e3832bed0dd'}).exec(function(err, user){
        "use strict";





        Company.findOne({user: user.id}).exec(function(err, company) {





          Catalogs.findOne({company: company.id}).exec(function(err, catalog) {









            NameCatalogs.findOne({catalog: catalog.id, nameCatalog: 'Вина' }).exec(function(err, namecatalog) {











            var arr =  undescore.map(namecatalog.nameCollwithValue, function(num, key){


                return num.value;

              });



              function transpose(arr) {
                return Object.keys(arr[0]).map(function (c) {
                  return arr.map(function (r) {
                    return r[c];
                  });
                });
              }

            console.log(transpose(arr));

























              done();






            })














            })





          })

















      })













    });
  });
});
