var Reflux = require('reflux');
var MainActions = require('../actions/MainActions');
var SchoolActions = require('../actions/SchoolActions');
var $ = require('jquery');

mainStore = Reflux.createStore({

  listenables: [MainActions, SchoolActions],

  onPopulate: function(leagueID) {
    $.ajax({
      url: '/api/leagues/'+leagueID,
      dataType: 'json',
      method: 'GET',
      success: function(data) {
        this.trigger(data);
      }.bind(this)
    });
  },

  onSelectTeamCompleted: function(leagueId) {
    this.onPopulate(leagueId);
  }



});

module.exports = mainStore;