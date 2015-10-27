var Reflux = require('reflux');
var CreateLeagueActions = require('../actions/CreateLeagueActions');
var $ = require('jquery');

createLeagueStore= Reflux.createStore({
  listenables: [CreateLeagueActions],

  onCreateLeague: function(leaguename) {
    $.ajax({
      url: '/api/leagues',
      method: 'POST',
      data: {leaguename: leaguename},
      success: function(response) {
        this.trigger({created: true, leagueID: response})
      }.bind(this)
    });
  }

});


module.exports = createLeagueStore;