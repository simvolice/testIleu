/**
 * Created by Moon on 05.07.2015.
 */

var React = require('react');
var  ReactApp = React.createFactory(require('./myWork'));



var mountNode = document.getElementById("react");

React.render(new ReactApp({}), mountNode);





