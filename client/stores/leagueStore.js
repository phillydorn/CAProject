var Reflux = require('reflux');
var LeagueActions = require('../actions/LeagueActions');
var $ = require('jquery');

leagueStore = Reflux.createStore({

  listenables: [LeagueActions],

  onLoadUserLeagues: function() {
    $.ajax({
      url: '/api/leagues/user',
      dataType: 'json',
      method: 'GET',
      success: function(data) {
        this.trigger(data);
      }.bind(this)
    });
  },

  onLoadAllLeagues: function() {
    $.ajax({
      url: '/api/leagues',
      dataType: 'json',
      method: 'GET',
      success: function(response) {
        var data = {
          leaguesList: response,
          joinedLeague: ''
        }
        this.trigger(data);
      }.bind(this)
    });
  },

  onSelectLeague: function(leagueId) {
    $.ajax({
      url: 'api/leagues',
      dataType: 'json',
      method: 'PUT',
      data: {id: leagueId},
      success: function(response) {
        var data = {
          joinedLeague: response,
          leaguesList: []
        }
        console.log('selected', data)
        this.trigger(data);
      }.bind(this)
    });
  }

});

module.exports = leagueStore;