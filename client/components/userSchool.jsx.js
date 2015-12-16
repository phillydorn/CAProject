var React = require('react');

var UserSchool = React.createClass({
  render: function() {
    return (
        <li className = {"school " + this.props.schoolName}>
          <a href="#">{this.props.order}.  {this.props.schoolName}</a>
        </li>
      )
  }
});

module.exports = UserSchool;