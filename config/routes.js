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

  '/': {
      view: 'homepage',

  },




  'post /createcompany': 'CompanyController.createFirm',

//Auth
    'get /login': 'AuthController.login',
    'get /logout': 'AuthController.logout',







  'get /recov': 'AuthController.recov',


  'post /forgetpass': 'AuthController.forgetpass',



    'get /confirmemail': 'AuthController.confirmemail',
    'get /alreadyconfirm': 'AuthController.alreadyconfirm',

    'get /verifemail': 'AuthController.verifemail',


  'get /restorepass': 'AuthController.restorepass',


  'get /restore': 'AuthController.restore',


  'post /restofromq': 'AuthController.restofromq',

    'post /auth/local': 'AuthController.callback',
    'post /auth/local/:action': 'AuthController.callback',

    'get /auth/:provider': 'AuthController.provider',
    'get /auth/:provider/callback': 'AuthController.callback',
    'get /auth/:provider/:action': 'AuthController.callback',




  //Profile
  'get /profile': 'ProfileController.view',
  'post /profiledit': 'ProfileController.profedit',
  'post /uploadfile': 'ProfileController.uploadfile',
    'post /resetpsw': 'ProfileController.resetpsw',







  //TypeController
  'get /typeview': 'TypeController.typeview',

  'post /typeprocess/:action': 'TypeController.typeProcess',


//Kontragent

  'get /kontraview': 'KontraController.view',


  'post /kontra/:action': 'KontraController.kontraAction',


//Catalogs

  'get /catalogview': 'CatalogController.view',


  'post /catalogadd': 'CatalogController.add',



  //Список справочников
  'get /cataloglistview': 'CatalogController.cataloglistview',

  //Переход по ссылкам
  'get /cataloglist': 'CatalogController.catalogtable',



  'post /catalogs/:action': 'CatalogController.catalogedit',

  'post /catalogdel': 'CatalogController.ctldel',













//Старт процесса
  'get /startprocess': 'ProcessController.startProcess',

  'post /processpost': 'ProcessController.processSave',




  //Мои процессы


'get /myprocess': 'MyProcessController.view'




};
