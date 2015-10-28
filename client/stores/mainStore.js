var Reflux = require('reflux');
var MainActions = require('../actions/MainActions');
var $ = require('jquery');

mainStore = Reflux.createStore({

  listenables: [MainActions],

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



});

module.exports = mainStore;