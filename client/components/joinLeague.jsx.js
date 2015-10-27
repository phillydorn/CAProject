var React = require('react');
var LeagueActions = require('../actions/LeagueActions');
var Reflux = require('reflux');
var Router = require('react-router');


var joinLeague = React.createClass({

  getInitialState: function() {
    return {teamForm: <div/>}
  },

  handleSelect: function(e) {
    e.preventDefault();
    LeagueActions.selectLeague(this.props.leagueId);
  },


  render: function() {
    return (
        <li onClick={this.handleSelect} className = {"league " + this.props.leagueName}>
          <a href={"#" +  this.props.leagueId} >{this.props.leagueName}</a>
          {this.state.teamForm}
        </li>
      )
  }
});

module.exports = joinLeague;