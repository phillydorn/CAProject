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
      console.log('state', this.state)
      return {loggedIn : AuthActions.verify()}
    },

    updateAuth: function(loggedIn) {
      console.log('setting', loggedIn)
      this.setState({loggedIn: loggedIn})
    },



    render: function() {
      return (
        <RequestComponent loggedIn={this.state.loggedIn} />
        )
    }

    });

  return AuthenticatedComponent;
}