import { React, Reflux, Router, ReactDOM } from '../importPackage';


var AuthComponent = require('./Authenticated.jsx.js');
var leagueStore = require('../stores/leagueStore');
var createTeamStore = require('../stores/createTeamStore');
var JoinLeague = require('./JoinLeague.jsx.js');
var LeagueActions = require('../actions/LeagueActions');

  module.exports = AuthComponent(React.createClass({

    mixins: [Reflux.ListenerMixin, Router.Navigation],

    getInitialState: function() {
      return {leaguesList: []}
    },

    componentWillMount: function(){
      LeagueActions.loadAllLeagues();
    },

    componentDidMount: function() {
      this.listenTo(leagueStore, this.loadLeagues);
      this.listenTo(createTeamStore, this.pathRedirect);
    },

    loadLeagues: function(data) {
      this.setState({
        leaguesList: data.leaguesList
      });
    },

    pathRedirect: function(leagueID) {
      if (leagueID) {
      this.transitionTo('/league/'+leagueID);
      }
    },

    render: function() {
      var leagueNodes = this.state.leaguesList.map(function (league) {
        return (
            <JoinLeague leagueName = {league.name} key = {league.id} leagueId = {league.id} />
          )
      });
      return (
          <div className = "league-page">
          <h1>Join a League</h1>
            <ul className = "league-list">
              {leagueNodes}
            </ul>
          </div>
        );
    }
  }));