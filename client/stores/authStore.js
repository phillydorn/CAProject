var $ = require('jquery');
var Reflux=require('reflux');
var AuthActions = require('../actions/AuthActions');

var authStore = Reflux.createStore({

  listenables: [AuthActions],


  onVerify: function() {
    $.ajax({
      url: '/api/auth/verify',
      method: 'GET',
      success: function(response) {
        this.loggedIn = response;
        this.trigger(response);
      }.bind(this)
    });
  }

});


module.exports = authStore;