var React = require('react');
var Reflux = require('reflux');
var AuthActions = require('../actions/AuthActions');
var authStore = require('../stores/authStore');



module.exports =function(RequestComponent) {
  var AuthenticatedComponent = React.createClass({

    mixins: [Reflux.connect(authStore, "loggedIn")],

     statics: {
        willTransitionTo: function (transition) {
          if(!authStore.loggedIn) {
            transition.redirect('/login');
          }
        }
      },

    getInitialState: function() {
      return { loggedIn : AuthActions.verify()}
    },

    updateAuth: function(loggedIn) {
      this.setState({loggedIn: loggedIn})
    },



    render: function() {
      return (
        <RequestComponent params={this.props.params} loggedIn={this.state.loggedIn} />
        )
    }

    });

  return AuthenticatedComponent;
}