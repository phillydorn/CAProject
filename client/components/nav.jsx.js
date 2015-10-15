var React = require('react');

var NavHeader = React.createClass({
  render: function() {
    return (
      <nav>
      <a href='/'>Home</a>
      <a href='/#/signup'>Sign Up</a>
      <a href='/#/login'>Log In</a>

      </nav>
      );
  }
});

module.exports = NavHeader;
