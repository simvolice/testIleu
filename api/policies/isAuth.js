/**
 * Created by Moon on 01.07.2015.
 */
module.exports = function (req, res, next) {



  if(req.user){

  return next();


  }


    return res.forbidden();



};
