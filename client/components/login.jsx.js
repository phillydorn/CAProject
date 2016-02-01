import { React, Reflux, Router, ReactDOM } from '../importPackage';

var LoginActions = require('../actions/LoginActions');
var loginStore = require('../stores/loginStore');
var authStore = require('../stores/authStore');

var Login = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(authStore, 'loggedIn')],


  getInitialState: function() {
    return {loggedIn: this.props.loggedIn}
  },

  componentDidMount: function() {
    this.listenTo(authStore, this.pathRedirect);
  },

  pathRedirect: function(loggedIn) {
    if (loggedIn) {
      this.transitionTo('/')
    }
  },


  handleSubmit: function(e) {
    e.preventDefault();
    var data = {
      username: ReactDOM.findDOMNode(this.refs.username).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    }
    LoginActions.sendLogin(data);
  },

  render: function() {
    return (
      <div>
        <form noValidate className="signup-form" onSubmit = {this.handleSubmit}>
          <h1>Login</h1>
          <label>username</label>
          <input type="text" placeholder="username" ref="username"/>
          <label>Password</label>
          <input type="password" placeholder="password" ref="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
});

module.exports = Login;