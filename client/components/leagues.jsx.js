var React = require('react');
var Reflux = require('reflux');
var AuthComponent = require('./Authenticated.jsx.js');
var leagueStore = require('../stores/leagueStore');
var League = require('./league.jsx.js');
var LeagueActions = require('../actions/LeagueActions');


  module.exports = AuthComponent(React.createClass({

    mixins: [Reflux.connect(leagueStore, "leaguesList")],

    getInitialState: function() {
      return {leaguesList: []}
    },

    componentDidMount: function(){
      LeagueActions.loadUserLeagues();
    },

    componentWillUnmount: function() {

    },


    render: function() {
      var leagueNodes = this.state.leaguesList.map(function (league) {
        return (
            <League leagueName = {league.name} key = {league.id} leagueId = {league.id} />
          )
      });
      return (
          <div className = "league-page">
            <h1>Your Leagues</h1>
            <ul className = "league-list">
              {leagueNodes}
            </ul>
          </div>
        );
    }
  }));