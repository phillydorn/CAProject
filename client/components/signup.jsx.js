var React = require('react');

var Signup = React.createClass({
  render: function() {
    return (
      <div className="signup-form">
      <h1>Signup</h1>
        <label>email</label>
        <input type="email" placeholder="email" />
        <label>Password</label>
        <input type="password" placeholder="password" />
      </div>
    );
  }
});

module.exports = Signup;
