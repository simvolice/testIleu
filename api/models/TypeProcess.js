/**
 * Created by Moon on 10.07.2015.
 */




var TypeProcess = {




  attributes: {




    company: {model: 'Company'},



    nameType: {type: 'string'},











    nameProcess: {collection: 'NameProcess', via: 'typeProcess'}




  }











};



module.exports = TypeProcess;
