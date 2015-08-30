/**
 * Created by Moon on 01.07.2015.
 */


module.exports = function (req, res, next) {



  try{
  if(req.user.verificatedEmail){


    return next();


  }else{


    return res.redirect('/login');

  }

}catch(err){

    return res.redirect('/login');

  }




};
