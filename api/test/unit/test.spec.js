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









            NameCatalogs.findOne({catalog: catalog.id, nameCatalog: 'Города' }).exec(function(err, namecatalog) {











              var objNew2 = {};







              var arr2 = [];



            var arrsp = function(arr, i) {




              arr2.push(i);

              arr.splice(undescore.first(arr2), 1);



            };



              namecatalog.nameCollwithValue.forEach(function(item2){



                objNew2 = undescore.findWhere(namecatalog.nameCollwithValue, {col: item2.col});






                arrsp(objNew2.value,objNew2.value.indexOf('Москва'));







              console.log(objNew2);

              });





























              done();






            })














            })





          })

















      })













    });
  });
});
