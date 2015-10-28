var Reflux = require('reflux');
var CreateLeagueActions = require('../actions/CreateLeagueActions');
var $ = require('jquery');

var createTeamStore = Reflux.createStore({

  listenables: [CreateLeagueActions],


  onCreateTeam: function(leagueID, teamname) {
    $.ajax({
      url: '/api/leagues/'+leagueID,
      method: 'POST',
      data: {teamname: teamname},
      success: function(response) {
        this.trigger(leagueID);
      }.bind(this)
    });
  }

});


module.exports = createTeamStore ;