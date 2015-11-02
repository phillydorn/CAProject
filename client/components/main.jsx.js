var React = require('react');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
var MainActions = require('../actions/MainActions');
var TeamPool = require('./teamPool.jsx.js');
var UserTeam = require('./userTeam.jsx.js');
var OtherTeam = require('./otherTeams.jsx.js');
var Bracket = require('./bracket.jsx.js');
var AuthComponent = require('./Authenticated.jsx.js');
var WebSocket = require('ws');



  module.exports = AuthComponent(React.createClass({

    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
      return {otherTeams: [], leagueId: this.props.params.league, teamId: '', leagueName: '', schoolsList: []}
    },

    componentDidMount: function(){
      this.listenTo(mainStore, this.populate);
      MainActions.populate(this.state.leagueId);
      var host = location.origin.replace(/^http/, 'wss');
      var ws = new WebSocket(host);
      ws.onmessage = function (event) {
        console.log('received', event.data)
        if (event.data==='update'){
          MainActions.populate(this.state.leagueId);
        }
      }.bind(this)
    },

    populate: function(data) {
      this.setState({
        otherTeams: data.teams,
        schoolsList: data.schoolsList,
        leagueName: data.leagueName,
        teamId: data.userTeam.id
      });
    },

    render: function() {
      return (
          <div className="main">
            <h1>{this.state.leagueName}</h1>
            <Bracket teams={this.state.schoolsList} />
            <TeamPool leagueId={this.state.leagueId} schoolsList={this.state.schoolsList} />
            <OtherTeam otherTeams={this.state.otherTeams} />
            <UserTeam teamId={this.state.teamId} />
          </div>
        );
    }
  }));


