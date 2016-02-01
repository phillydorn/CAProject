import { React, Router, Reflux } from '../importPackage';
var LeagueActions = require('../actions/LeagueActions');
var TeamForm = require('./teamForm.jsx.js');


var joinLeague = React.createClass({

  getInitialState: function() {
    return {teamForm: <div/>}
  },

  handleSelect: function(e) {
    e.preventDefault();
    this.setState({
      teamForm: <TeamForm leagueID={this.props.leagueId} />
    });
  },


  render: function() {
    return (
        <li onClick={this.handleSelect} className = {"league " + this.props.leagueName}>
          <a href={"#" + this.props.leagueId}>{this.props.leagueName}</a>
          {this.state.teamForm}
        </li>
      )
  }
});

module.exports = joinLeague;