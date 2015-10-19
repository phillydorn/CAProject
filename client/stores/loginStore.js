var React = require('react');
var Reflux = require('reflux');
var LoginActions = require('../actions/LoginActions');
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
        console.log('success')
        location.hash='/';
      },
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