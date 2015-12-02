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
  }

});


module.exports = SchoolStore;