var Reflux = require('reflux');
var UserTeamActions = require('../actions/UserTeamActions');
var mainStore = require('./mainStore');

userTeamStore = Reflux.createStore({
  userSchoolList: ['','','','','','','','','',''],

  init: function() {
    this.listenTo(mainStore, this.onAddSchool);
  },



  onAddSchool: function(mainData) {
    var school = mainData.school[0];
    var list= this.userSchoolList;
    for (var i=0; i<10; i++) {
      if (list[i]==='') {
        list[i] = {name: school.name, id: school.id};
        break;
      }
    }
   this.trigger(list);
  }
});

module.exports = userTeamStore;