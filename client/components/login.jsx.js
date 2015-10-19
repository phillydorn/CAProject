var React = require('react');
var LoginActions = require('../actions/LoginActions');
var loginStore = require('../stores/loginStore');

var Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },


  handleSubmit: function(e) {
    e.preventDefault();
    var data = {
      username: React.findDOMNode(this.refs.username).value,
      password: React.findDOMNode(this.refs.password).value
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