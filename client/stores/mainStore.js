var Reflux = require('reflux');
var MainActions = require('../actions/MainActions');
var SchoolActions = require('../actions/SchoolActions');
var $ = require('jquery');


var mainStore = Reflux.createStore({

  listenables: [MainActions, SchoolActions],

  onPopulate: function(leagueID, socket) {
    $.ajax({
      url: '/api/leagues/'+leagueID,
      dataType: 'json',
      method: 'GET',
      success: function(data) {
        this.trigger(data);
        if (socket) {
          socket.emit('leaguePage', {leagueId: leagueID});
        }
      }.bind(this)
    });
  },

  onSelectTeamCompleted: function(leagueId) {
    console.log('complete')
    socket.emit('update', {leagueId: leagueId});
  },

  onStartDraft: function(leagueId) {
    socket.emit('startDraft', leagueId)
  }



});

module.exports = mainStore;