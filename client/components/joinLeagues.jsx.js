var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var AuthComponent = require('./Authenticated.jsx.js');
var leagueStore = require('../stores/leagueStore');
var JoinLeague = require('./JoinLeague.jsx.js');
var LeagueActions = require('../actions/LeagueActions');

  module.exports = AuthComponent(React.createClass({

    mixins: [Reflux.connect(leagueStore, "data"), Router.Navigation],

    getInitialState: function() {
      return {data: {leaguesList: []}}
    },

    componentWillMount: function(){
      LeagueActions.loadAllLeagues();
    },

    componentDidMount: function() {
      this.listenTo(leagueStore, this.pathRedirect);
    },

    pathRedirect: function(data) {
      var league = data.joinedLeague;
      console.log('league is', league)
      if (league) {
        this.transitionTo('/leagues/'+league.id);
      }
    },

    render: function() {
      var leagueNodes = this.state.data.leaguesList.map(function (league) {
        return (
            <JoinLeague leagueName = {league.name} key = {league.id} leagueId = {league.id} />
          )
      });
      return (
          <div className = "league-page">
            <ul className = "league-list">
              {leagueNodes}
            </ul>
          </div>
        );
    }
  }));