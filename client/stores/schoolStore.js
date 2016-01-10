import {Reflux, $} from '../importPackage';
var SchoolActions = require('../actions/SchoolActions');

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

  onRerank: function(schoolId, rank, teamId) {
    $.ajax({
      method: 'PUT',
      url: '/api/teams/'+ teamId,
      data: { schoolId, rank },
      success: function (response) {
        console.log('ranking', response)
      }
    })
  }

});


module.exports = SchoolStore;