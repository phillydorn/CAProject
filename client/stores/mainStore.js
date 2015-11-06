var Reflux = require('reflux');
var MainActions = require('../actions/MainActions');
var SchoolActions = require('../actions/SchoolActions');
var $ = require('jquery');
var io = require('socket.io-client');
var socket = io(location.origin, {transports: ['websocket']});


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
  }



});

module.exports = mainStore;