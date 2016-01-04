var Reflux= require('reflux');
var SchoolActions = require('../actions/SchoolActions');
var $ = require('jquery');

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

  onRerank: function(rank, teamId) {
    $.ajax({
      method: 'PUT',
      url: '/api/teams/'+ teamId,
      data: { rank },
      success: function (response) {
        console.log(response)
      }
    })
  }

});


module.exports = SchoolStore;