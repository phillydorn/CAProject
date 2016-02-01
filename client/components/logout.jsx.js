import { React, Reflux, Router, ReactDOM } from '../importPackage';
var LogoutActions = require('../actions/LogoutActions');
var logoutStore = require('../stores/logoutStore');

var Logout = React.createClass({

  mixins: [Router.Navigation, Reflux.ListenerMixin],


  componentDidMount: function() {
    this.listenTo(logoutStore, this.pathRedirect);
    LogoutActions.logout();
  },

  pathRedirect: function() {
    this.transitionTo('/');
  },

  render: function() {
    return (
      <div>
        <h1>Logging Out</h1>
      </div>
    );
  }
});

module.exports = Logout;