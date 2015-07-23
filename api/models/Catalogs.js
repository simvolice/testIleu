/**
 * Created by Moon on 09.07.2015.
 */




var Catalogs = {


  attributes: {





    company: {model: 'Company'},


    name: {collection: 'NameCatalogs', via: 'catalog'}






  }




};


module.exports = Catalogs;
