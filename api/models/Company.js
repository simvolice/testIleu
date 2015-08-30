/**
 * Created by Moon on 05.07.2015.
 */




var Company = {

  attributes: {


    user: { model: 'User' },


    name: {type: 'string'},

    bin: {type: 'string'},


    logo: {type: 'string'},


    employees: {type: 'array'},


    nameprocessYes: {type: 'boolean', defaultsTo: function(){


      return false;

    }},













    //TODO:Ссылки на коллекции, далее будут проверяться



    processes:  { collection: 'Process', via: 'company' },







    //TODO:Сразу первый справочник, по умолчанию "Типы процессов", остальные будут создаваться через Catalog



    typeprocess: {collection: 'TypeProcess', via: 'company'},





    catalogforprocess: {collection: 'CatalogForProcess', via: 'company'}















  }








};

module.exports = Company;
