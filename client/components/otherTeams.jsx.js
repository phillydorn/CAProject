"use strict";

var React = require('react');
var UserSchool = require('./userSchool.jsx.js');
var Reflux = require('reflux');
var otherTeamStore = require('../stores/otherTeamStore');
var OtherTeamActions=  require('../actions/OtherTeamActions');
var OtherTeam = require('./otherTeam.jsx.js');
var UserTeam = require('./userTeam.jsx.js');

var OtherTeams = React.createClass({

  getInitialState() {
    return {otherTeamId: '', teamName: '', team: {}}
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.otherTeams.length !== this.props.otherTeams.length ||
           nextState.otherTeamId !== this.state.otherTeamId;

  },

  handleSelect (e) {
    var teamName;
    this.props.otherTeams.forEach ((team) => {
      if (team.id == e.target.value) {
        teamName = team.team_name;
      }
    });
    this.setState({
      otherTeamId: e.target.value,
      teamName: teamName
    });
  },


  render () {
    console.log('render other Teams', this.props, 'state', this.state)
    var otherTeams = this.props.otherTeams.map(function(team) {
      return (
        <option key={team.id} value={team.id}>{team.team_name}</option>
      )
    })
    return (
      <div className = "team-box otherTeam">
      <select onChange={this.handleSelect}>
        <option value="">Other Teams</option>
        {otherTeams}
      </select>
        <OtherTeam teamId ={this.state.otherTeamId} teamName={this.state.teamName} />
      </div>
    )
  }
});


module.exports = OtherTeams;

