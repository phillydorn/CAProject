var Reflux = require('reflux');
var SignupActions = require('../actions/SignupActions');
var AuthActions = require('../actions/AuthActions');

signupStore= Reflux.createStore({
  listenables: [SignupActions],

  onSendSignupCompleted: function(data) {
    console.log('store data', data);
    AuthActions.verify();
  }

});


module.exports = signupStore;