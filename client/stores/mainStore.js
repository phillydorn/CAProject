var Reflux = require('reflux');
var MainActions = require('../actions/MainActions');
var $ = require('jquery');

mainStore = Reflux.createStore({

  listenables: [MainActions],

  onPopulate: function() {
    $.ajax({
      url: '/api/leagues/'+location.hash.slice(10),
      dataType: 'json',
      method: 'GET',
      success: function(data) {
        console.log('onload', data)
        this.trigger(data);
      }.bind(this)
    });
  },


  onSelectTeam: function(school) {
    var list = this.stateData.list;
    for (var i = 0; i< list.length; i++) {
      if (list[i].id === school.props.schoolId) {
        var selectedSchool = list.splice(i,1);
      }
    }
    this.trigger({list:list, school:selectedSchool});
  },
  onSelectTeamCompleted: function(school) {
    console.log('completed', school)
  }
});

module.exports = mainStore;