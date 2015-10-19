var React = require('react');

var School = React.createClass({
  render: function() {
    return (
        <li className = {this.props.schoolName}>
          <p>{this.props.schoolName}</p>
        </li>
      )
  }
});

module.exports = School;