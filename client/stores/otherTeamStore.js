var Reflux = require('reflux');
var OtherTeamActions = require('../actions/OtherTeamActions');
var SchoolActions = require('../actions/SchoolActions');
var mainStore = require('./mainStore');
var $ = require('jquery');

var otherTeamStore = Reflux.createStore({

  listenables: [OtherTeamActions, SchoolActions],

  getSchools: function(teamId) {
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

module.exports = otherTeamStore;