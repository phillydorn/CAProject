var React = require('react');
var Reflux = require('reflux');
var LoginActions = require('../actions/LoginActions');
var AuthActions = require('../actions/AuthActions');
var $ = require('jquery');

loginStore= Reflux.createStore({
  listenables: [LoginActions],

  onSendLogin: function(data) {
    $.ajax({
      url: '/api/auth/login',
      dataType: 'json',
      method: 'POST',
      data: data,
      success: function(data) {
        AuthActions.verify();
      }.bind(this),
      error: function(error, err2, err3) {
        console.log('error', error, '2', err2, '3', err3);

      }

    })

  },
  onSendLoginCompleted: function(data){
    console.log('complete', data);
  },
  onSendLoginFailed: function(data) {
    console.log('failed', data)
  }



});


module.exports = loginStore;