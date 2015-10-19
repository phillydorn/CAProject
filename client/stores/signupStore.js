var Reflux = require('reflux');
var SignupActions = require('../actions/SignupActions');

signupStore= Reflux.createStore({
  listenables: [SignupActions],

  onSendSignupCompleted: function(data) {
    console.log('store data', data);
  }

});


module.exports = signupStore;