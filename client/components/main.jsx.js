var React = require('react');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
var MainActions = require('../actions/MainActions');
var TeamPool = require('./teamPool.jsx.js');
var Timer = require('./timer.jsx.js');
var UserTeam = require('./userTeam.jsx.js');
var OtherTeam = require('./otherTeams.jsx.js');
var ChatWindow = require('./chatWindow.jsx.js');
var Bracket = require('./bracket.jsx.js');
var AuthComponent = require('./Authenticated.jsx.js');


  module.exports = AuthComponent(React.createClass({

    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
      return {round: 0, position: 0, time: '', otherTeams: [], leagueId: this.props.params.league, username: '', teamId: '', leagueName: '', schoolsList: [], yourTurn: false, activeTeam: ''}
    },

    componentWillMount: function() {
    },

    componentDidMount: function(){
      this.listenTo(mainStore, this.populate);
      // MainActions.openSocket(this.state.leagueId);
      socket.on('update', (message) => {
        console.log('updating', message)
        MainActions.populate(this.state.leagueId);
      });
      socket.emit('leaguePage', {leagueId: this.state.leagueId});
      MainActions.populate(this.state.leagueId);
      socket.on('timer', (seconds)=> {
        this.setState({time: seconds})
      });
      socket.on('advance', (data)=>{
        if (this.state.teamId == data.nextUpId) {
          this.setState({yourTurn: true});
        } else {
          this.setState({yourTurn: false});
        }
        this.setState({activeTeamId: data.nextUpId, activeTeamName: data.nextUpName})
      });
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
    startDraft: function(e) {
      socket.emit('startDraft', this.state.leagueId);
      // MainActions.startDraft(this.state.leagueId);
    },

    componentWillUnmount: function () {
      socket.emit('leave', {leagueId: this.state.leagueId});
    },

    render: function() {
      return (
          <div className="main">
            <h1>{this.state.leagueName}</h1>
            <button classname="start" onClick={this.startDraft} >Start Draft</button>
            <Timer round={this.state.round+1} time={this.state.time} activeTeamId={this.state.activeTeamId} activeTeamName={this.state.activeTeamName} />
            <Bracket teams={this.state.schoolsList} />
            <TeamPool yourTurn={this.state.yourTurn} leagueId={this.state.leagueId} schoolsList={this.state.schoolsList} />
            <OtherTeam otherTeams={this.state.otherTeams} />
            <UserTeam teamId={this.state.teamId} />
            <ChatWindow leagueId = {this.state.leagueId} username={this.state.username} />
          </div>
        );
    }
  }));


