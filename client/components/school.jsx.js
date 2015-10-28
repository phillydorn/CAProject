var React = require('react');
var SchoolActions = require('../actions/SchoolActions');
var UserTeamActions = require('../actions/UserTeamActions');
var schoolStore = require('../stores/schoolStore');

var School = React.createClass({

  handleSelect: function(e) {
    var schoolId = this.props.schoolId;
    var leagueId = this.props.leagueId;
    e.preventDefault();
    SchoolActions.selectTeam(schoolId, leagueId);
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