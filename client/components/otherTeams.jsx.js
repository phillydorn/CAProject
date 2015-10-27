var React = require('react');
var UserSchool = require('./userSchool.jsx.js');
var Reflux = require('reflux');
var otherTeamStore = require('../stores/otherTeamStore');
var OtherTeamActions=  require('../actions/OtherTeamActions');
var OtherTeam = require('./otherTeam.jsx.js');

var OtherTeams = React.createClass({

  getInitialState: function() {
    return {otherTeam: 'Other Teams'}
  },

  handleSelect: function (e) {
    console.log('value',e.target.value);
    this.setState({
      otherTeam: e.target.value
    });
  },


  render: function() {

    var otherTeams = this.props.otherTeams.map(function(team) {
      return (
        <option value={team.username} >{team.username}</option>
      )
    })
    return (
      <div className = "team-box otherTeam">
      <select onChange={this.handleSelect}>
        <option value="">Other Teams</option>
        {otherTeams}
      </select>
        <OtherTeam owner={this.state.otherTeam} />
      </div>
    )
  }
});


module.exports = OtherTeams;

