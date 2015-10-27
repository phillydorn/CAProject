var React = require('react');
var Reflux = require('reflux');
var LogoutActions = require('../actions/LogoutActions');
var AuthActions = require('../actions/AuthActions');
var $ = require('jquery');

logoutStore= Reflux.createStore({
  listenables: [LogoutActions],

  onLogout: function(data) {
    $.ajax({
      url: '/api/auth/logout',
      dataType: 'json',
      method: 'GET',
      success: function(data) {
        console.log('success')
        AuthActions.verify();
        this.trigger('/');
      }.bind(this),
      error: function(error, err2, err3) {
        console.log('error', error, '2', err2, '3', err3);

      }

    })

  }


});


module.exports = logoutStore;