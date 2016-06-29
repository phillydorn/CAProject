var Reflux = require('reflux');
var UserTeamActions = require('../actions/UserTeamActions');
var SchoolActions = require('../actions/SchoolActions');
var $ = require('jquery');

var userTeamStore = Reflux.createStore({

  listenables: [UserTeamActions, SchoolActions],

  getSchools: function(teamId) {
    console.log('laodscholls', teamId)
    $.ajax({
      method: 'GET',
      url: '/api/teams/'+teamId,
      success: function(response) {
        console.log('user', response)
        this.trigger(response);
      }.bind(this)
    });
  },

  onGetTeam: function(leagueId) {
    $.ajax({
      method: 'GET',
      url: '/api/teams/league/'+leagueId,
      success: (teamId)=>{
        this.getSchools(teamId);
      },
      error (err) {
        console.log('err', err)
      }
    });
  },

  onLoadSchools: function(teamId) {
    this.teamId = teamId;
    console.log('load', teamId)
    this.getSchools(teamId);
  },

  onSelectTeamCompleted: function() {
    this.getSchools(this.teamId);
    }
});

module.exports = userTeamStore;