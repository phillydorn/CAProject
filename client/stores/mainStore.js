var Reflux = require('reflux');
var MainActions = require('../actions/MainActions');
var $ = require('jquery');

mainStore = Reflux.createStore({

  listenables: [MainActions],


  getInitialState: function() {
    this.schoolsList = {};
    this.schoolsList.list = [];
    this.schoolsList.school = [];
    return {list: this.schoolsList, otherTeams: []};
  },

  onLoadSchools: function() {
    var self = this;
    // $.ajax({
    //   url: '/api/schools',
    //   dataType: 'json',
    //   method: 'GET',
    //   success: function(data) {
    //     self.schoolsList.list = data;
    //     self.trigger(self.schoolsList);
    //   }
    // });
  },



  onSelectTeam: function(school) {
    var list = this.schoolsList.list;
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