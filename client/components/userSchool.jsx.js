var React = require('react');

var UserSchool = React.createClass({


  render: function() {
  let background = this.props.order % 2 === 0 ? '#6a89c0' : 'inherit';
    return (
      <li style = {{'backgroundColor': background, 'height': '20px'}}
        className = {"school " + this.props.schoolName}  >
          <a href="#">{this.props.order}.  {this.props.schoolName}</a>
        </li>
      )
  }
});

module.exports = UserSchool;