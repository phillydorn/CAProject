var React = require('react');
var UserSchool = require('./userSchool.jsx.js');
var Reflux = require('reflux');
var otherTeamStore = require('../stores/otherTeamStore');
var OtherTeamActions=  require('../actions/OtherTeamActions');
var OtherTeam = require('./otherTeam.jsx.js');
var UserTeam = require('./userTeam.jsx.js');

var OtherTeams = React.createClass({

  getInitialState: function() {
    return {otherTeam: ''}
  },

  handleSelect: function (e) {
    console.log('value',e.target.value);
    this.setState({
      otherTeam: e.target.value
    });
  },


  render: function() {
    console.log('other team state', this.state)
    var otherTeams = this.props.otherTeams.map(function(team) {
      return (
        <option key={team.id} value={team.id} >{team.team_name}</option>
      )
    })
    return (
      <div className = "team-box otherTeam">
      <select onChange={this.handleSelect}>
        <option value="">Other Teams</option>
        {otherTeams}
      </select>
        <OtherTeam teamId ={this.state.otherTeam} />
      </div>
    )
  }
});


module.exports = OtherTeams;

