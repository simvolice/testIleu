/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/




  /**
   *Домашняя, индексная страница, с модальным окном создании компании
   */
  'get /': 'HomeController.homeview',

  'post /sendreqtocompany': 'HomeController.senreqtocompany',

////////////////////////////////////////////////////////////////////




  /**
   * Создание компании
   */
  'post /createcompany': 'CompanyController.createFirm',
////////////////////////////////////////////////////////////////////







  /**
   *Auth, Восстановление, активация
   */
  'get /login': 'AuthController.login',
    'get /logout': 'AuthController.logout',
 'get /recov': 'AuthController.recov',


  'post /forgetpass': 'AuthController.forgetpass',



    'get /confirmemail': 'AuthController.confirmemail',
    'get /alreadyconfirm': 'AuthController.alreadyconfirm',

    'get /verifEmail': 'AuthController.verifemail',


  'get /restorepass': 'AuthController.restorepass',


  'get /restore': 'AuthController.restore',


  'post /restofromq': 'AuthController.restofromq',

    'post /auth/local': 'AuthController.callback',
    'post /auth/local/:action': 'AuthController.callback',

    'get /auth/:provider': 'AuthController.provider',
    'get /auth/:provider/callback': 'AuthController.callback',
    'get /auth/:provider/:action': 'AuthController.callback',

////////////////////////////////////////////////////////////////////






  /**
   * Работа с профелем пользователя
   */
  'get /profile': 'ProfileController.view',
  'post /profiledit': 'ProfileController.profedit',
  'post /uploadfile': 'ProfileController.uploadfile',
    'post /resetpsw': 'ProfileController.resetpsw',
////////////////////////////////////////////////////////////////////
 /**
   * Сокетная версия сохранения профайла пользователя
   */
  'post /sentprofile': 'ProfileController.testsocket',

////////////////////////////////////////////////////////////////////








  /**
   * Работа с типами процессов
   */
  'get /typeview': 'TypeController.typeview',

  'post /typeprocess/:action': 'TypeController.typeProcess',

////////////////////////////////////////////////////////////////////




















  /**
   * Старт процесса
   */
  'get /startprocess': 'ProcessController.startProcess',

  ////////////////////////////////////////////////////////////////////
  /**
   * Сокет для отображения взаимосвязанных таблиц
   */
  'post /fromsocket': 'ProcessController.fromsocketstart',

////////////////////////////////////////////////////////////////////





  /**
   * Сохранение процесса
   */
  'post /processpost': 'ProcessController.processSave',

////////////////////////////////////////////////////////////////////







  /**
   * Таблица с процессами
   */
  'get /myprocess': 'MyProcessController.view',

////////////////////////////////////////////////////////////////////


  /**
   * Индивидуальный процесс
   */
  'get /processlist': 'MyProcessController.processview',


  'post /iniciator/:action': 'MyProcessController.iniciatorwork',


  'post /performer/:action': 'MyProcessController.performerwork',



  'post /answer/:action': 'MyProcessController.answer',
////////////////////////////////////////////////////////////////////



  /**
   * Сохранение дочернего процесса
   */
  'post /dprocesssave': 'MyProcessController.dprocess',

////////////////////////////////////////////////////////////////////



  /**
   * Сохранение комментария
   */
  'post /commentsave': 'MyProcessController.commentsave',

////////////////////////////////////////////////////////////////////



  /**
   *Получить все уведомления текущего пользователя
   */
  'get /allnotif': 'NotifController.getAllNotif',

  'get /getallnotifview': 'NotifController.view',

  'post /sendtoread': 'NotifController.sendtoread',

    'post /yesreq': 'NotifController.yesreq',

    'post /noreq': 'NotifController.noreq',
////////////////////////////////////////////////////////////////////




  'post /gettableforprocess': 'ProcessController.getTableForStartProcessPage'


};
