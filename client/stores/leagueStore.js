var Reflux = require('reflux');
var LeagueActions = require('../actions/LeagueActions');
var $ = require('jquery');

leagueStore = Reflux.createStore({

  listenables: [LeagueActions],


  onLoadLeagues: function() {
    $.ajax({
      url: '/api/leagues',
      dataType: 'json',
      method: 'GET',
      success: function(data) {
        this.trigger(data);
      }.bind(this)
    });
  }

});

module.exports = leagueStore;