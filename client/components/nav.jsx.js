var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NavHeader = React.createClass({
  render: function() {
    return (
      <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
        <li><Link to='/login'>Log In</Link></li>
        <li><Link to='/#'>Bracket</Link></li>
        <li><Link to='/create'>Create League</Link></li>
        <li><Link to='/join'>Join League</Link></li>
        <li><Link to='/leagues'>Your Leagues</Link></li>
        <li><Link to='/logout'>Log Out</Link></li>
      </ul>
      </nav>
      );
  }
});

module.exports = NavHeader;
