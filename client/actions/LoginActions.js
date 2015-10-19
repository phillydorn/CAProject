var Reflux = require('reflux');
var $ = require('jquery');


LoginActions = Reflux.createActions({
  "sendLogin": {children: ['completed', 'failed']}
  });




module.exports = LoginActions;