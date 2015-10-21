var Reflux = require('reflux');
var OtherTeamActions = require('../actions/OtherTeamActions');

otherTeamStore = Reflux.createStore({

  listenables: [OtherTeamActions],


   onLoadTeams: function() {
    var otherTeams = [
        "Christophe",
        "Pete",
        "Mitch",
        "Adam"
      ];
      this.trigger(otherTeams);
    }
});

module.exports = otherTeamStore;