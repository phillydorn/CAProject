import { React, Reflux, $ } from '../importPackage';
var LoginActions = require('../actions/LoginActions');
import AppActions from '../actions/AppActions';

var appStore = Reflux.createStore({
  listenables: [LoginActions, AppActions],

  onSendLogin: function(data) {
    console.log('Logging in')
  },

  onSendLoginCompleted: function(data) {
    console.log('SUCCESS');
    this.setState({loggedIn:true})
  },

  onSendLoginFailed: function(data) {
    console.log('FAIL');
    this.setState({loggedIn:true})
  },

  onUpdateResults () {
    $.ajax ({
      method: 'GET',
      url: 'api/schools/results',
      success(data) {
        console.log('succes', data)
      }
    });
  }
});