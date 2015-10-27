var Reflux = require('reflux');
var OtherTeamActions = require('../actions/OtherTeamActions');
var $ = require('jquery');

otherTeamStore = Reflux.createStore({

  listenables: [OtherTeamActions],


   onLoadSchools: function(ownerId) {
    console.log('id', ownerId)
    $.ajax({
      url: '/api/teams/'+ownerId,
      method: 'GET',
      success: function(data) {
        console.log('teams', data)
      }
    });

      // this.trigger(otherTeams);
    }
});

module.exports = otherTeamStore;