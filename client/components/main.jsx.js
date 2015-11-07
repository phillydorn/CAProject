var React = require('react');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
var MainActions = require('../actions/MainActions');
var TeamPool = require('./teamPool.jsx.js');
var UserTeam = require('./userTeam.jsx.js');
var OtherTeam = require('./otherTeams.jsx.js');
var ChatWindow = require('./chatWindow.jsx.js');
var Bracket = require('./bracket.jsx.js');
var AuthComponent = require('./Authenticated.jsx.js');
var io = require('socket.io-client');
var socket = io(location.origin, {transports: ['websocket']});



  module.exports = AuthComponent(React.createClass({

    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
      return {socket: socket, otherTeams: [], leagueId: this.props.params.league, username: '', teamId: '', leagueName: '', schoolsList: []}
    },

    componentDidMount: function(){
      this.listenTo(mainStore, this.populate);
      socket.on('update', (message) => {
        console.log('updating', message)
        MainActions.populate(this.state.leagueId);
      });
      socket.emit('leaguePage', {leagueId: this.state.leagueId});
      MainActions.populate(this.state.leagueId);
    },

    populate: function(data) {
      this.setState({
        otherTeams: data.teams,
        schoolsList: data.schoolsList,
        leagueName: data.leagueName,
        teamId: data.userTeam.id,
        username: data.username
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
            <ChatWindow socket={this.state.socket} leagueId = {this.state.leagueId} username={this.state.username} />
          </div>
        );
    }
  }));


