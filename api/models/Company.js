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
















    //TODO:Ссылки на коллекции, далее будут проверяться



    processes:  { collection: 'Process', via: 'company' },




    catalogs: {collection: 'Catalogs', via: 'company'},




    //TODO:Сразу первый справочник, по умолчанию "Типы процессов", остальные будут создаваться через Catalog



    typeprocess: {collection: 'TypeProcess', via: 'company'},



    kontragent: {collection: 'Kontragents', via: 'company'},















  }


  //Здесь пишем все before









};

module.exports = Company;
