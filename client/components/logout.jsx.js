var React = require('react');
var LogoutActions = require('../actions/LogoutActions');
var logoutStore = require('../stores/logoutStore');

var Logout = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  componentDidMount: function() {
    LogoutActions.logout();
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