var Reflux = require('reflux');
var UserTeamActions = require('../actions/UserTeamActions');
var SchoolActions = require('../actions/SchoolActions');
var mainStore = require('./mainStore');
var $ = require('jquery');

var userTeamStore = Reflux.createStore({

  listenables: [UserTeamActions, SchoolActions],

  getSchools: function(teamId) {
    console.log('laodscholls', teamId)
    $.ajax({
      method: 'GET',
      url: '/api/teams/'+teamId,
      success: function(response) {
        this.trigger(response);
      }.bind(this)
    });
  },

  onLoadSchools: function(teamId) {
    this.teamId = teamId;
    this.getSchools(teamId);
  },

  onSelectTeamCompleted: function() {
    this.getSchools(this.teamId);
    }
});

module.exports = userTeamStore;