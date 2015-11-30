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
    console.log('complete')
    socket.emit('update', {leagueId: leagueId});
    // this.onPopulate(leagueId);
  },

  onStartDraft: function(leagueId) {
    socket.emit('startDraft', leagueId)
    // $.ajax({
    //   url: '/api/leagues/start',
    //   method: 'POST',
    //   data: {leagueId: leagueId},
    //   success: function(data) {
    //     console.log('return',data)
    //   }
    // });
  }



});

module.exports = mainStore;