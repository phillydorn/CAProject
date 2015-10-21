var React = require('react');
var UserSchool = require('./userSchool.jsx.js');
var Reflux = require('reflux');
var otherTeamStore = require('../stores/otherTeamStore');
var OtherTeamActions=  require('../actions/OtherTeamActions');

var OtherTeam = React.createClass({

    mixins: [Reflux.connect(otherTeamStore, "otherTeams")],


 getInitialState: function() {
    list = [];
    for (var i=0; i<10; i++) {
      list.push('');
    }
    return {otherSchoolList: list, otherTeams: []};
  },
  componentWillMount: function() {
    OtherTeamActions.loadTeams();
  },

  render: function() {
    console.log(this.state)
    var schoolNodes = this.state.otherSchoolList.map(function (school) {
      return (
          <UserSchool schoolName = {school.name} schoolId={school.id} key={school.id} />
        )
    });
    var otherTeams = this.state.otherTeams.map(function(team) {
      return (
        <option value={team}>{team}</option>
      )
    })
    return (
      <div className = "team-box otherTeam">
      <select>
        {otherTeams}
      </select>
        <ul className="team-list">
         {schoolNodes}
        </ul>
      </div>
    )
  }
});


module.exports = OtherTeam;

