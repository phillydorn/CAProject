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


  module.exports = AuthComponent(React.createClass({

    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
      return {otherTeams: [], leagueId: this.props.params.league, username: '', teamId: '', leagueName: '', schoolsList: []}
    },

    componentWillMount: function() {
      // this.setState({socket : io.connect(location.origin, {transports: ['websocket']})});
    },

    componentDidMount: function(){
      console.log('mainsocket', socket)
      this.listenTo(mainStore, this.populate);
      // MainActions.openSocket(this.state.leagueId);
      console.log('state', socket)
      socket.on('update', (message) => {
        console.log('updating', message)
        MainActions.populate(this.state.leagueId);
      });
      console.log('socket emitting')
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

    componentWillUnmount: function () {
      socket.emit('leave', {leagueId: this.state.leagueId});
    },

    render: function() {
      return (
          <div className="main">
            <h1>{this.state.leagueName}</h1>
            <Bracket teams={this.state.schoolsList} />
            <TeamPool leagueId={this.state.leagueId} schoolsList={this.state.schoolsList} />
            <OtherTeam otherTeams={this.state.otherTeams} />
            <UserTeam teamId={this.state.teamId} />
            <ChatWindow socket={socket} leagueId = {this.state.leagueId} username={this.state.username} />
          </div>
        );
    }
  }));


