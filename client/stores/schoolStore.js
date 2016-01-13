import {Reflux, $} from '../importPackage';
var SchoolActions = require('../actions/SchoolActions');
var MainActions = require('../actions/MainActions');

var SchoolStore = Reflux.createStore({


  listenables: [SchoolActions],

  onSelectTeam: function(schoolId, leagueId){
    $.ajax({
      method: 'PUT',
      url: '/api/leagues/'+leagueId,
      data: {
        schoolId: schoolId
      },
      success: function(response) {
        SchoolActions.selectTeam.completed(leagueId);
      }.bind(this)
    });
  },

  onRerank: function(schoolId, currentRank, newRank, teamId) {
    $.ajax({
      method: 'PUT',
      url: '/api/teams/'+ teamId,
      data: { schoolId, currentRank, newRank },
      success: function (response) {
        MainActions.populate(teamId, null, 'custom');
        console.log('ranking', response)
      }
    })
  }

});


module.exports = SchoolStore;