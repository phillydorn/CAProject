var React = require('react');

var Login = React.createClass({
  render: function() {
    return (
      <div className="signup-form">
        <h1>Login</h1>
        <label>email</label>
        <input type="email" placeholder="email" />
        <label>Password</label>
        <input type="password" placeholder="password" />
      </div>
    );
  }
});

module.exports = Login;