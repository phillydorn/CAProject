import React from 'react';
import Reflux from 'reflux';
import mainStore from '../stores/mainStore';
import MainActions from '../actions/MainActions';
import TeamPool from './teamPool.jsx.js';
import Timer from './timer.jsx.js';
import UserTeam from './userTeam.jsx.js';
import OtherTeam from './otherTeams.jsx.js';
import ChatWindow from './chatWindow.jsx.js';
import Bracket from './bracket.jsx.js';
import AuthComponent from './Authenticated.jsx.js';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext }from 'react-dnd';



  module.exports = DragDropContext(HTML5Backend)(AuthComponent(React.createClass({

    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
      return {
        round: 0,
        position: 0,
        time: '',
        otherTeams: [],
        leagueId: this.props.params.league,
        username: '',
        teamId: '',
        leagueName: '',
        schoolsList: [],
        yourTurn: false,
        activeTeam: '',
        drafting: false
      }
    },

    componentWillMount: function() {
    },

    componentDidMount: function(){
      MainActions.populate(this.state.leagueId, socket);
      this.listenTo(mainStore, this.populate);

      socket.on('update', (message) =>{
        console.log('updating', message)
        MainActions.populate(this.state.leagueId);
      });


      socket.on('timer', (seconds)=> {
        this.setState({time: seconds})
      });

      socket.on('advance', (data)=>{
        this.setState({drafting: true});
        if (data.round == 10) {
          this.setState({yourTurn: false});
        } else {
          if (this.state.teamId == data.nextUpId) {
            this.setState({yourTurn: true});
          } else {
            this.setState({yourTurn: false});
          }
          this.setState({activeTeamId: data.nextUpId, activeTeamName: data.nextUpName})
        }
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
      this.setState({drafting: true});
      // MainActions.startDraft(this.state.leagueId);
    },

    componentWillUnmount: function () {
      socket.removeAllListeners('timer');
      socket.removeAllListeners('advance');
      socket.removeAllListeners('update');
      socket.emit('leave', {leagueId: this.state.leagueId});
    },

    render: function() {

      let startButton = this.state.drafting ? '' : <button className="start" onClick={this.startDraft} >Start Draft</button>
      return (
          <div className="main">
            <h1>{this.state.leagueName}</h1>
            {startButton}
            <Timer round={this.state.round+1} time={this.state.time} activeTeamId={this.state.activeTeamId} activeTeamName={this.state.activeTeamName} />
            <Bracket teams={this.state.schoolsList} />
            <TeamPool yourTurn={this.state.yourTurn} leagueId={this.state.leagueId} schoolsList={this.state.schoolsList} teamId={this.state.teamId} />
            <OtherTeam otherTeams={this.state.otherTeams} />
            <UserTeam teamId={this.state.teamId} />
            <ChatWindow leagueId = {this.state.leagueId} username={this.state.username} />
          </div>
        );
    }
  })));

