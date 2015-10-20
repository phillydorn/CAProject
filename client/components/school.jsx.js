var React = require('react');
var MainActions = require('../actions/MainActions');
var UserTeamActions = require('../actions/UserTeamActions');

var School = React.createClass({

  handleSelect: function(e) {
    e.preventDefault();
    MainActions.selectTeam(this);
    // UserTeamActions.addSchool(selectedSchool);
  },
  render: function() {
    return (
        <li onClick = {this.handleSelect} className = {"school " + this.props.schoolName}>
          <a href="#">{this.props.schoolName}</a>
        </li>
      )
  }
});

module.exports = School;