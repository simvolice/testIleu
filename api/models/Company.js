/**
 * Created by Moon on 05.07.2015.
 */




var Company = {

  attributes: {


    user: { model: 'User', required: true },


    name: {type: 'string', required: true, unique: true},

    bin: {type: 'integer', required: true, unique: true},


    logo: {type: 'string'},


    users: {type: 'array'},














    //TODO:Ссылки на коллекции, далее будут проверяться



    processes:  { collection: 'Process', via: 'company' },




    catalogs: {collection: 'Catalogs', via: 'company'},




    //TODO:Сразу первый справочник, по умолчанию "Типы процессов", остальные будут создаваться через Catalog



    typeprocess: {collection: 'TypeProcess', via: 'company'},



    kontragent: {collection: 'Kontragents', via: 'company'}











  }


  //Здесь пишем все before









};

module.exports = Company;
