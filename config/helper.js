/**
 * Created by Moon on 24.07.2015.
 */
var Handlebars=require('sails/node_modules/express-handlebars/node_modules/handlebars');





var Swag = require('swag');

Swag.registerHelpers(Handlebars);



Handlebars.registerHelper('delspace', function(options) {
  return options.fn(this.replace(/\s+/g, ''));
});





