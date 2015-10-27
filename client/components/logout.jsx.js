var React = require('react');
var LogoutActions = require('../actions/LogoutActions');
var logoutStore = require('../stores/logoutStore');
var Router = require('react-router');
var Reflux = require('reflux');

var Logout = React.createClass({

  mixins: [Router.Navigation, Reflux.ListenerMixin],

  contextTypes: {
    router: React.PropTypes.func
  },
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