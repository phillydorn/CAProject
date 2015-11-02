var React = require('react');
var Reflux = require('reflux');
var SignupActions = require('../actions/SignupActions');
var signupStore = require('../stores/signupStore');
var Router = require('react-router');
var authStore = require('../stores/authStore');

var Signup = React.createClass({

  mixins: [Router.Navigation, Reflux.connect(authStore, 'loggedIn')],


  getInitialState: function() {
    return {loggedIn: this.props.loggedIn}
  },

  componentDidMount: function() {
    this.listenTo(authStore, this.pathRedirect);
  },

  pathRedirect: function(loggedIn) {
    if (loggedIn) {
      this.transitionTo('/');
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var firstname= React.findDOMNode(this.refs.firstname).value
    var lastname= React.findDOMNode(this.refs.lastname).value;
    var username= React.findDOMNode(this.refs.username).value;
    var email= React.findDOMNode(this.refs.email).value;
    var password= React.findDOMNode(this.refs.password).value;

    var data = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password
      };
      SignupActions.sendSignup(data);
  },


  render: function() {
    return (
      <div>
        <form noValidate className="signup-form" onSubmit={this.handleSubmit}>
        <h1>Signup</h1>
        <div className="input-block">
          <label>First Name</label>
          <input type="text" placeholder="First Name" ref="firstname" />
        </div>
        <div className="input-block">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" ref="lastname" />
        </div>
        <div className="input-block">
          <label>Username</label>
          <input type="text" placeholder="Username" ref="username" />
        </div>
        <div className="input-block">
          <label>email</label>
          <input type="email" placeholder="email" ref="email" />
        </div>
        <div className="input-block">
          <label>Password</label>
          <input type="password" placeholder="password" ref="password" />
        </div>
        <input type="Submit" />
        </form>
      </div>
    );
  }
});

module.exports = Signup;
