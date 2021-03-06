var Reflux = require('reflux');
var MainActions = require('../actions/MainActions');
var SchoolActions = require('../actions/SchoolActions');
var $ = require('jquery');


var mainStore = Reflux.createStore({

  listenables: [MainActions, SchoolActions],

  onPopulate: function(ID, socket, order) {
    order = order || 'default';
    let url;
    if (order === 'default') {
      url = '/api/leagues/'+ID;
    } else if (order == 'custom') {
      url = '/api/teams/pool/' + ID
    }

    $.ajax({
      url,
      dataType: 'json',
      method: 'GET',
      success: function(data) {
        this.trigger(data);
      }.bind(this)
    });
  },

  onSelectTeamCompleted: function(leagueId, schoolId, teamId, schoolName) {
    console.log('complete')
    socket.emit('update', {leagueId, teamId, schoolName});
  },

  onStartDraft: function(leagueId) {
    socket.emit('startDraft', leagueId)
  }



});

module.exports = mainStore;