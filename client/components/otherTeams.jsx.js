var React = require('react');
var UserSchool = require('./userSchool.jsx.js');
var Reflux = require('reflux');
var mainStore = require('../stores/mainStore');
// var UserTeamActions=  require('../actions/UserTeamActions');
// var userTeamStore =  require('../stores/userTeamStore');

var OtherTeam = React.createClass({

    // mixins: [Reflux.connect(userTeamStore, "userSchoolList")],


 getInitialState: function() {
    list = [];
    for (var i=0; i<10; i++) {
      list.push('');
    }
    return {otherSchoolList: list, teamName: ''};
  },

  render: function() {
    var schoolNodes = this.state.otherSchoolList.map(function (school) {
      return (
          <UserSchool schoolName = {school.name} schoolId={school.id} key={school.id} />
        )
    });
    return (
      <div className = "team-box otherTeam">
      <h1>{this.state.teamName}</h1>
        <ul className="team-list">
         {schoolNodes}
        </ul>
      </div>
    )
  }
});


module.exports = OtherTeam;

