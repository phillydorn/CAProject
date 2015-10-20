var Reflux = require('reflux');
var MainActions = require('../actions/MainActions');

mainStore = Reflux.createStore({

  listenables: [MainActions],


  getInitialState: function() {
    return {list: this.onLoadSchools()};
  },

  onLoadSchools: function() {
    this.schoolsList = [
      {name: 'Northwestern', id: 1},
      {name: 'Michigan', id: 2},
      {name: 'Ohio State', id: 3},
      {name: 'Michigan State', id: 4},
      {name: 'Purdue', id: 5},
      {name: 'Illinois', id: 6},
    ];
    return this.schoolsList;

  },


  onSelectTeam: function(school) {
    var list = this.schoolsList;
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