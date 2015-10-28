var React = require('react');
var CreateLeagueActions = require('../actions/CreateLeagueActions');
var createTeamStore = require('../stores/createTeamStore');
var AuthComponent = require('./Authenticated.jsx.js');
var Reflux = require('reflux');
var Router = require('react-router');



var teamForm = React.createClass({



  handleSubmit: function(e) {
    e.preventDefault();
      var teamName= React.findDOMNode(this.refs.teamName).value;
    console.log('trigger', this.props.leagueID, teamName)
      CreateLeagueActions.createTeam(this.props.leagueID, teamName);
    },

  clicked: function(e) {
    e.stopPropagation();
  },


    render: function() {
      var self = this;
      return (
        <div>
          <form noValidate className="team-form" onSubmit={self.handleSubmit}>
            <h1>Create A Team For This League</h1>
            <div className="input-block">
              <label>Team Name</label>
              <input type="text" placeholder="Team Name" ref="teamName" />
            </div>
            <input type="submit" onClick={this.clicked} />
          </form>
        </div>
      );
    }
});

module.exports = teamForm;
