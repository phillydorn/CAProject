var React = require('react');
var Reflux = require('reflux');
var LoginActions = require('../actions/LoginActions');

var appStore = Reflux.createStore({
  listenables: [LoginActions],

  onSendLogin: function(data) {
    console.log('Logging in')
  }

  onSendLoginCompleted: function(data) {
    console.log('SUCCESS');
    this.setState({loggedIn:true})
  },

  onSendLoginFailed: function(data) {
    console.log('FAIL');
    this.setState({loggedIn:true})
  }
});