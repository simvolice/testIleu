/**
 * Created by Moon on 22.07.2015.
 */



  var uuid = require('node-uuid');
var undescore = require('underscore');


var CatalogController = {


  view: function (req, res, next) {



    res.view('catalog');






  },


  add: function (req, res, next){



    User.findOne({id: req.user.id}).exec(function(err, user){
      "use strict";





      Company.findOne({user: user.id}).exec(function(err, company) {





        Catalogs.findOne({company: company.id}).exec(function(err, catalog) {



          //Создание с нуля
          var obj = {};

          var arr = req.body.mycol;


          arr.forEach(function(item){


            obj[key] = {


              col: item,
              value: []



            }



          })




          NameCatalogs.create({catalog: catalog.id ,nameCatalog: req.body.name, url: sails.getBaseurl() + '/cataloglist?id=' + uuid.v4(), nameCollwithValue: obj }).exec(function(err, namecatalog) {


            res.redirect('/catalogview');



          });

        });
      });
    });
          },



  cataloglistview: function(req, res, next){




    User.findOne({id: req.user.id}).exec(function(err, user){

      Company.findOne({user: user.id}).exec(function(err, company) {


        Catalogs.findOne({company: company.id}).exec(function(err, catalog) {


          NameCatalogs.find({catalog: catalog.id }).exec(function(err, namecatalog) {



            res.view('cataloglist', {cataloglist: namecatalog});




          });

        });
      });
    });
          },




  catalogtable: function(req, res, next){




    User.findOne({id: req.user.id}).exec(function(err, user){

      Company.findOne({user: user.id}).exec(function(err, company) {


        Catalogs.findOne({company: company.id}).exec(function(err, catalog) {


          NameCatalogs.findOne({catalog: catalog.id, url: sails.getBaseurl() + '/cataloglist?id=' + req.query.id }).exec(function(err, cataloglist) {


            var arr =  undescore.map(cataloglist.nameCollwithValue, function(num, key){


              return num.value;

            });


            function transpose(arr) {
              return Object.keys(arr[0]).map(function (c) {
                return arr.map(function (r) {
                  return r[c];
                });
              });
            }



            var obj = transpose(arr);


              res.view('catalogtable', { name: cataloglist.nameCatalog, nameColl: cataloglist.nameCollwithValue, gridrow: obj  });










          });

        });

      });
    });
          },





  catalogedit: function(req, res, next){


    var param = req.params.action;




    if (param === 'create'){

      User.findOne({id: req.user.id}).exec(function(err, user){

        Company.findOne({user: user.id}).exec(function(err, company) {


          Catalogs.findOne({company: company.id}).exec(function(err, catalog) {


            NameCatalogs.findOne({catalog: catalog.id, nameCatalog: req.body.catname }).exec(function(err, cataloglist) {


              var namecol = req.body.namecol;


              var value = req.body.value;

              var objNew1 = {};

              var objNew2 = {};




              objNew1 =  undescore.object(namecol, value);



             var com = undescore.map(objNew1, function(num, key){



                objNew2 = undescore.findWhere(cataloglist.nameCollwithValue, {col: key});




                objNew2.value.push(num);





               return objNew2;


              });

              NameCatalogs.update({catalog: catalog.id ,nameCatalog: req.body.catname }, {nameCollwithValue: com}).exec(function(err, updcatalog){


                 res.redirect(cataloglist.url)


              });


















            });
          });
        });
      });





            }





  }







};



module.exports = CatalogController;
